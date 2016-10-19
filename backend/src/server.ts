import mongoose = require("mongoose");
import socketio = require("socket.io");
import http = require("http");

import * as express from "express";
import * as bodyParser from "body-parser";

import RootRouter from "./router/root.router";
import { SocketConnector } from "./sockets/socket-connector";
import ChatSocketController from "./sockets/chat-socket.controller";

export class Server {
  private httpServer: http.Server;
  private app: express.Application;
  private port: number;

  constructor(port: number, dbURI: string) {
    this.port = port;

    this.app = express();
    this.httpServer = http.createServer(this.app);

    this.configureMongoDB(dbURI);
    this.configureExpress();
    this.configureRouter();
    this.configureSockets();
  }

  public static bootstrap(port: number = 3000, dbURI: string = 'mongodb://mongodb/app'): Server {
    return new Server(port, dbURI);
  }

  public start(): void {
    this.httpServer.listen(this.port,
      () => console.log(`Backend-App is listing on port ${this.port}!`)
    );
  }

  private configureMongoDB(dbURI: string): void {
    mongoose.connect(dbURI);

    mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${dbURI}`));
    mongoose.connection.on('error', (err: any) => console.log(`Mongoose connection error: ${err.toString()}`));
    mongoose.connection.on('disconnected', () => console.log(`Mongoose disconnected from ${dbURI}`));

    mongoose.Promise = Promise;
  }

  private configureExpress(): void {
    //noinspection TypeScriptValidateTypes
    this.app.use(bodyParser.json());
  }

  private configureRouter(): void {
    //noinspection TypeScriptValidateTypes
    this.app.use('/', new RootRouter().getRouter());
  }

  private configureSockets(): void {
    let io = socketio(this.httpServer);
    new SocketConnector(io, [
      ChatSocketController.setListener
    ]);
  }
}