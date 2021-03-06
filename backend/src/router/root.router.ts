import * as express from "express";
import AbstractRouter from "./abstract-router";
import MessageRouter from "./message.router";
import { sendResult } from "../utils/router.utils";
import UserRouter from "./user.router";

export default class RootRouter extends AbstractRouter {
  configure(): void {
    //noinspection TypeScriptValidateTypes
    this._router.use('/users', new UserRouter().getRouter());
    //noinspection TypeScriptValidateTypes
    this._router.use('/messages', new MessageRouter().getRouter());

    this._router.get('/', (req: express.Request, res: express.Response) => {
      sendResult(res, {
        status: 200,
        json: {
          messages: '/messages',
          users: '/users'
        }
      });
    });
  }
}