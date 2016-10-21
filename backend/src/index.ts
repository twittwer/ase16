import { Server } from "./server";

let server: Server = Server.bootstrap(4000);
server.start();