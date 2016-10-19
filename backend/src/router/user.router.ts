import * as express from "express";

import AbstractRouter from "./abstract-router";
import { Result } from "../utils/result.interface";
import { sendResult } from "../utils/router.utils";
import UserController from "../controller/user.controller";

export default class UserRouter extends AbstractRouter {
  configure(): void {

    this._router.get('/', (req: express.Request, res: express.Response) => {
      UserController.list()
        .then((result: Result) => sendResult(res, result))
        .catch((error: Result) => sendResult(res, error));
    });

    this._router.post('/', (req: express.Request, res: express.Response) => {
      UserController.create(req.body)
        .then((result: Result) => sendResult(res, result))
        .catch((error: Result) => sendResult(res, error));
    });

    this._router.get('/:username', (req: express.Request, res: express.Response) => {
      UserController.get(req.params.username)
        .then((result: Result) => sendResult(res, result))
        .catch((error: Result) => sendResult(res, error));
    });
  }
}