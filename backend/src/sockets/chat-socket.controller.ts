import { Socket } from "./socket-connector";

export default class ChatSocketController {
  public static setListener(socket: Socket): void {
    console.log(`\n\n >> client registered #2: ${socket.username} << \n`);
    // TODO: Set Socket Listeners
  }
}