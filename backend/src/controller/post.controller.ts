import * as express from "express";
import { MessageModel, Message } from "../models/message.model";
import { ControllerResult } from "./controller-result.interface";

export default class PostController {

  public static create(post: Message): Promise<ControllerResult> {
    return new Promise((resolve, reject) => {
      post.save()
        .then((result: Message) => resolve({ status: 201, json: result }))
        .catch((err: any) => reject({ status: 500, msg: `DB Error: ${err.toString()}` }));
    });
  }

  public static list(): Promise<ControllerResult> {
    return new Promise((resolve, reject) => {
      MessageModel.find()
        .then((result: Message[]) => resolve({ status: 200, json: result }))
        .catch((err: any) => reject({ status: 500, msg: `DB Error: ${err.toString()}` }));
    });
  }

  public static get(id: string): Promise<ControllerResult> {
    return new Promise((resolve, reject) => {
      MessageModel.findOne({ _id: id })
        .then((result: Message) => resolve({ status: 200, json: result }))
        .catch((err: any) => {
          if (err.name === 'CastError') {
            reject({ status: 400, msg: `Invalid ${err.path}` });
            return;
          }
          reject({ status: 500, msg: `DB Error: ${err.toString()}` });
        });
    });
  }
}