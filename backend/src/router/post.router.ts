import * as express from "express";

import AbstractRouter from "./abstract-router";
import PostController from "../controller/post.controller";
import { ControllerResult, sendControllerResult } from "../controller/controller-result.interface";

export default class PostRouter extends AbstractRouter {
  configure(): void {
    this._router.get('/', (req: express.Request, res: express.Response) => {
      PostController.list()
        .then((result: ControllerResult) => sendControllerResult(result, res))
        .catch((error: ControllerResult) => sendControllerResult(error, res));
    });
    this._router.post('/', (req: express.Request, res: express.Response) => {
      PostController.create(req.body)
        .then((result: ControllerResult) => sendControllerResult(result, res))
        .catch((error: ControllerResult) => sendControllerResult(error, res));
    });
    this._router.get('/:id', (req: express.Request, res: express.Response) => {
      PostController.get(req.params.id)
        .then((result: ControllerResult) => sendControllerResult(result, res))
        .catch((error: ControllerResult) => sendControllerResult(error, res));
    });
  }
}