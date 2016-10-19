import * as express from "express";

import AbstractRouter from "./abstract-router";
import MessageController from "../controller/message.controller";
import { Result } from "../utils/result.interface";
import { generateDateFilter, sendResult, DateFilter } from "../utils/router.utils";

type MessageFilter = { sent_at: DateFilter };

export default class MessageRouter extends AbstractRouter {
  configure(): void {

    this._router.get('/', (req: express.Request, res: express.Response) => {
      let before: Date = req.query.before ? new Date(req.query.before) : null,
        after: Date = req.query.after ? new Date(req.query.after) : null;

      let filter: DateFilter|MessageFilter = generateDateFilter(before, after);
      filter = filter ? { sent_at: filter } : {};

      MessageController.list(filter)
        .then((result: Result) => sendResult(res, result))
        .catch((error: Result) => sendResult(res, error));
    });

    this._router.post('/', (req: express.Request, res: express.Response) => {
      MessageController.create(req.body)
        .then((result: Result) => sendResult(res, result))
        .catch((error: Result) => sendResult(res, error));
    });

    this._router.get('/:id', (req: express.Request, res: express.Response) => {
      MessageController.get(req.params.id)
        .then((result: Result) => sendResult(res, result))
        .catch((error: Result) => sendResult(res, error));
    });
  }
}