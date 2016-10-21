// import Socket = SocketIO.Socket;
import { UserModel, User } from "../models/user.model";
export interface SocketServer extends SocketIO.Server {
}

export interface Socket extends SocketIO.Socket {
  username: string;
}

type RegisterCallback = (socket: Socket, socketServer: SocketServer) => void;

export class SocketConnector {
  private socketServer: SocketServer;
  private registerCallbacks: RegisterCallback[];
  private connectedSockets: { [key: string]: Socket } = {};

  constructor(socketServer: SocketServer, registerCallback: RegisterCallback | RegisterCallback[]) {
    this.socketServer = socketServer;

    if (registerCallback instanceof Array) {
      this.registerCallbacks = registerCallback;
    } else { //noinspection TypeScriptValidateTypes
      this.registerCallbacks = [ registerCallback ];
    }

    this.configure();
  }

  private configure(): void {

    this.socketServer.on('connection', (socket: Socket) => {

      console.log('\n\n\n >>> new socket connection <<< \n\n\n');

      socket.on('register', (data: any) => this.registerDBUser(data.username.trim())
        .then((user: User) => this.registerSocketUser(socket, user))
        .catch(() => this.sendRegistrationFailed(socket, data.username)));

      socket.on('disconnect', () => {
        if (socket.username)
          delete this.connectedSockets[ socket.username ];
      });
    });
  }

  private registerDBUser(username: string): Promise<User> {
    console.info('registerDBUser');
    return new Promise((resolve, reject) => {
      UserModel.findOne({ username: username })
        .then((user: User) => {
          console.info('found user: ', user);
          if (!user) {
            console.info('create user: ', username);
            this.createDBUser(username)
              .then((user: User) => resolve(user))
              .catch(() => reject());
          } else {
            resolve(user);
          }
        })
        .catch((err: any) => reject());
    });
  }

  private createDBUser(username: string): Promise<User> {
    console.info('createDBUser');
    return new Promise((resolve, reject) => {
      let user: User = new UserModel({ username: username });
      console.info('AAAAAAA');
      user.save()
        .then((user: User) => {
          console.info('DBUser created');
          resolve(user);
        })
        .catch((err: any) => reject());
    });
  }

  private registerSocketUser(socket: Socket, user: User) {
    console.info('registerSocketUser');

    socket.username = user.username;
    this.connectedSockets[ user.username ] = socket;

    console.log(`
            \n >> client registration: ${user.username} <<
            \n   >> socket list: ${Object.keys(this.connectedSockets)}
            \n`);

    this.registerCallbacks.forEach((callback: RegisterCallback) => callback(socket, this.socketServer));

    socket.emit('registered', { user: user });
  }

  private sendRegistrationFailed(socket: Socket, username: string) {
    console.info('sendRegistrationFailed');
    socket.emit('registrationFailed', { failedUsername: username });
  }
}

export default SocketConnector;