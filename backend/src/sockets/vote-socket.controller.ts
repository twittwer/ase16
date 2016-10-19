import { SocketServer, Socket } from "./socket-connector";

/* Interfaces */
// ... //

/* Controller */
export default class VoteSocketController {
  private socketServer: SocketServer;
  private socket: Socket;

  private constructor(socket: Socket, socketServer: SocketServer) {
    this.socketServer = socketServer;
    this.socket = socket;

    socket.on('event', (data: any) => this.handleEvent(data));
  }

  public static bootstrap(socket: Socket, socketServer: SocketServer): void {
    new VoteSocketController(socket, socketServer);
  }

  /* Handle Event */
  private handleEvent(data: any) {
    // TODO: handle event
  }

  /* Send/Broadcast Event */
  private sendEvent(data: any) {
    this.socket.emit('event', data);
  }

  private broadcastEvent(room: string, data: any) {
    this.socket.broadcast.in(room).emit('event', data);
  }
}

class VoteManager {

  public static manageVote(): Promise<> {
    return new Promise((resolve, reject) => {
    });
  }
}