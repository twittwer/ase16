import { SocketServer, Socket } from "./socket-connector";
import { Message, MessageModel } from "../models/message.model";
import { ChatroomModel, Chatroom } from "../models/chatroom.model";
import { Vote } from "../models/vote.model";
import { SimpleError } from "../utils/error.interface";

/* Interfaces */
interface RoomData {
  room: string;
}
interface MessageData {
  msg: Message;
}
interface MessageListData extends RoomData {
  msgs: Message[];
  from: Date;
  to: Date;
}
interface JoinedRoomData extends RoomData, MessageListData {
  joined: boolean;
  vote?: Vote;
  msg?: string;
}

/* Controller */
export default class ChatSocketController {
  private socketServer: SocketServer;
  private socket: Socket;

  private constructor(socket: Socket, socketServer: SocketServer) {
    this.socketServer = socketServer;
    this.socket = socket;

    console.log(` >> registration of ChatSocketController for ${this.socket.username} << `);

    socket.on('joinRoom', (data: RoomData) => this.handleJoinRoom(data.room.trim()));

    socket.on('sendMessage', (data: MessageData) => {
      data.msg.author = this.socket.username;
      this.handleSendMessage(data.msg);
    });
  }

  public static bootstrap(socket: Socket, socketServer: SocketServer): void {
    new ChatSocketController(socket, socketServer);
  }

  /* Handle Event */
  private handleJoinRoom(room: string) {
    ChatroomManager.joinDBRoom(this.socket.username, room)
      .then((chatroom: Chatroom) => ChatroomManager.joinSocketRoom(this.socket, chatroom)
        .then(() => ChatroomManager.collectRecentMessages(room)
          .then((msgListData: MessageListData) => this.sendJoinedRoom(Object.assign({
            joined: true,
            vote: null // TODO-X: getRoomVote()
          }, msgListData)))
          .catch((err: SimpleError) => this.sendJoinedRoomWithError(room, err)))
        .catch((err: SimpleError) => this.sendJoinedRoomWithError(room, err))
      )
      .catch((err: SimpleError) => this.sendJoinedRoomWithError(room, err));
  }

  private handleSendMessage(msg: Message) {
    msg.save()
      .then((msg: Message) => this.sendNewMessage(msg))
      .catch((err: any) => this.sendSendMessageFailed(err, msg));
  }

  /* Send Event */
  private sendJoinedRoom(data: JoinedRoomData) {
    this.socket.emit('joinedRoom', data);
  }

  private sendJoinedRoomWithError(room: string, err: SimpleError) {
    this.sendJoinedRoom({
      room: room,
      joined: false,
      msg: err.msg || null, msgs: null, from: null, to: null
    });
  }

  private sendNewMessage(msg: Message) {
    this.socket.broadcast.in(msg.room).emit('newMessage', { msg: msg });
  }

  private sendSendMessageFailed(err: any, failedMsg: Message) {
    this.socket.emit('sendMessageFailed', {
      msg: 'saving message failed',
      error: err,
      failedMsg: failedMsg
    })
  }
}

class ChatroomManager {

  public static joinDBRoom(username: string, room: string): Promise<Chatroom|SimpleError> {
    return new Promise((resolve, reject) => {
      ChatroomModel.findOne({ name: room })
        .then((chatroom: Chatroom) => {
          if (chatroom.members.indexOf(username) === -1) {
            chatroom.members.push(username);
            chatroom.save()
              .then((chatroom: Chatroom) => resolve(chatroom))
              .catch((err: any) => reject({ msg: 'join failed', error: err }));
          }
          resolve(chatroom);
        })
        .catch((err: any) => {
          // TODO-X: create new chatroom if not exist
          console.log(err);
          reject({ msg: 'room not found', error: err })
        });
    });
  }

  public static joinSocketRoom(socket: Socket, chatroom: Chatroom): Promise<SimpleError> {
    return new Promise((resolve, reject) => {
      socket.join(chatroom.name, (err?: any) => err ? reject({ msg: 'join failed', error: err }) : resolve());
    });
  }

  public static collectRecentMessages(room: string): Promise<MessageListData|SimpleError> {
    return new Promise((resolve, reject) => {
      let before: Date = new Date();
      MessageModel.find({ room: room, sent_at: { $lte: before } }, { sort: { sent_at: -1 }, limit: 20 })
        .then((msgs: Message[]) => resolve({
          room: room,
          msgs: msgs,
          from: msgs.length ? msgs[ msgs.length - 1 ].sent_at : new Date(2000, 1, 1),
          to: before
        }))
        .catch((err: any) => reject({ msg: 'collection of messages failed', error: err }));
    });
  }
}