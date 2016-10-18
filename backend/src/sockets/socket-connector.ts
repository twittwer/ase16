import SocketServer = SocketIO.Server;

export interface Socket extends SocketServer {
  username?: string;
}

type RegisterCallback = (socket: Socket) => void;

export class SocketConnector {
  private socketServer: Socket;
  private registerCallbacks: RegisterCallback[];
  private connectedSockets: { [key: string]: Socket } = {};

  constructor(socketServer: Socket, registerCallback: RegisterCallback | RegisterCallback[]) {
    this.socketServer = socketServer;
    if (registerCallback instanceof Array)
      this.registerCallbacks = registerCallback;
    else
      this.registerCallbacks = [ registerCallback ];
    this.configure();
  }

  private configure(): void {

    this.socketServer.on('connection', (socket: Socket) => {

      socket.on('register', (data: any) => {
        this.connectedSockets[ data.username ] = socket;
        socket.username = data.username;

        console.log(`
            \n >> client registration: ${data.username} <<
            \n   >> ${JSON.stringify(data)}
            \n   >> socket list: ${Object.keys(this.connectedSockets)}
            \n`);

        this.registerCallbacks.forEach((callback: RegisterCallback) => callback(socket));
      });

      socket.on('disconnect', () => {
        if (socket.username)
          delete this.connectedSockets[ socket.username ];
      });
    });
  }
}

export default SocketConnector;