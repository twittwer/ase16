import * as express from "express";

import AbstractRouter from "./abstract-router";
import PostRouter from "./post.router";

import RootController from "../controller/root.controller";

import { ControllerResult, sendControllerResult } from "../controller/controller-result.interface";

export default class RootRouter extends AbstractRouter {
  configure(): void {
    //noinspection TypeScriptValidateTypes
    this._router.use('/posts', new PostRouter().getRouter());

    this._router.get('/', (req: express.Request, res: express.Response) => {
      RootController.welcome()
        .then((result: ControllerResult) => sendControllerResult(result, res));
    });
  }
}