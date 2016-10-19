import { SocketServer, Socket } from "./socket-connector";
import { Message } from "../models/message.model";

export default class ChatSocketController {
  public static setListener(socket: Socket, socketServer: SocketServer): void {
    console.log(`\n\n >> registration of ChatSocketController for ${socket.username} << \n`);
    // TODO: Set Socket Listeners

    interface RoomData {
      room: string;
    }
    interface MessageData extends RoomData {
      msg: Message;
    }
    interface MessageListData extends RoomData {
      msgs: Message[];
      from: Date;
      to: Date;
    }

    socket.on('joinRoom', (data: RoomData)=> {
      // save membership in database
      socket.join(data.room);
      // send 20 latest messages of room
      // socketServer.sockets[socket.id].emit('roomJoined', {MessageListData});
    });

    socket.on('sendMessage', (data: MessageData)=> {
      // save message in database
      // broadcast message to room
    });

  }
}