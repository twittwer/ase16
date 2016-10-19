import * as express from "express";

import AbstractRouter from "./abstract-router";
import MessageRouter from "./message.router";

import RootController from "../controller/root.controller";

import { Result } from "../controller/result.interface";
import { sendResult } from "../utils/router.utils";

export default class RootRouter extends AbstractRouter {
  configure(): void {
    //noinspection TypeScriptValidateTypes
    this._router.use('/messages', new MessageRouter().getRouter());

    this._router.get('/', (req: express.Request, res: express.Response) => {
      RootController.welcome()
        .then((result: Result) => sendResult(res, result));
    });
  }
}