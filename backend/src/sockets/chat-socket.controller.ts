import { SocketServer, Socket } from "./socket-connector";
import { Message, MessageModel } from "../models/message.model";
import { ChatroomModel, Chatroom } from "../models/chatroom.model";
import { Vote } from "../models/vote.model";
import { SimpleError } from "../utils/error.interface";

/* Input Data */
interface RoomData {
  room: string;
}
interface MessageData extends RoomData {
  msg: Message;
}

/* Output Data */
interface MessageListData extends RoomData {
  msgs: Message[];
  from: Date;
  to: Date;
}
interface JoinedRoomData extends MessageListData {
  joined: boolean;
  vote?: Vote;
  msg?: string;
}

export default class ChatSocketController {
  public static setListener(socket: Socket, socketServer: SocketServer): void {
    console.log(`\n\n >> registration of ChatSocketController for ${socket.username} << \n`);

    socket.on('joinRoom', (data: RoomData)=> {
      let room: string = data.room.trim();

      ChatroomManager.joinDBRoom(socket.username, room)
        .then(chatroom => ChatroomManager.joinSocketRoom(socket, chatroom)
          .then(() => ChatroomManager.collectRecentMessages()
            .then(msgListData => ChatSocketController.sendJoinedRoom(socket, Object.assign({
              joined: true,
              vote: null // TODO: getRoomVote()
            }, msgListData)))
            .catch(err => ChatSocketController.sendJoinedRoomError(socket, room, err)))
          .catch(err => ChatSocketController.sendJoinedRoomError(socket, room, err))
        )
        .catch(err => ChatSocketController.sendJoinedRoomError(socket, room, err));
    });

    socket.on('sendMessage', (data: MessageData)=> {
      // TODO: save message in database
      // TODO: broadcast message to room
    });

  }

  /* Send Event */
  private static sendJoinedRoomError(socket: Socket, room: string, err: SimpleError) {
    ChatSocketController.sendJoinedRoom(socket, {
      room: room,
      joined: false,
      msg: err.msg || null, msgs: null, from: null, to: null
    });
  }

  private static sendJoinedRoom(socket: Socket, data: JoinedRoomData) {
    socket.emit('joinedRoom', data);
  }
}

class ChatroomManager {

  public static joinDBRoom(username: string, room: string): Promise<Chatroom, SimpleError> {
    return new Promise((resolve, reject) => {
      ChatroomModel.findOne({ name: room })
        .then((chatroom: Chatroom) => {
          if (chatroom.members.indexOf(username) === -1) {
            chatroom.members.push(username);
            chatroom.save()
              .then((chatroom: Chatroom) => resolve(chatroom))
              .catch((error: any) => reject({ msg: 'join failed', error: error }));
          }
          resolve(chatroom);
        })
        .catch((error: any) => {
          // TODO: create new chatroom if not exist
          console.log(error);
          reject({ msg: 'room not found', error: error })
        });
    });
  }

  public static joinSocketRoom(socket: Socket, chatroom: Chatroom): Promise<void, SimpleError> {
    return new Promise((resolve, reject) => {
      socket.join(chatroom.name, (err?: any) => err ? reject(err) : resolve());
    });
  }

  public static collectRecentMessages(room: string): Promise<MessageListData, SimpleError> {
    return new Promise((resolve, reject) => {
      let before: Date = new Date.now();
      MessageModel.find({ room: room, sent_at: { $lt: before } }, {})
    });
  }
}