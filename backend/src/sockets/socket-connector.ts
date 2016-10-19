export interface SocketServer extends SocketIO.Server {
}

export interface Socket extends SocketIO.Socket {
  username?: string;
}

type RegisterCallback = (socket: Socket, socketServer: SocketServer) => void;

export class SocketConnector {
  private socketServer: SocketServer;
  private registerCallbacks: RegisterCallback[];
  private connectedSockets: { [key: string]: Socket } = {};

  constructor(socketServer: SocketServer, registerCallback: RegisterCallback | RegisterCallback[]) {
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

        this.registerCallbacks.forEach((callback: RegisterCallback) => callback(socket, this.socketServer));
      });

      socket.on('disconnect', () => {
        if (socket.username)
          delete this.connectedSockets[ socket.username ];
      });
    });
  }
}

export default SocketConnector;