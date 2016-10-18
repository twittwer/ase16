import * as express from "express";
import { PostModel, Post } from "../models/post.model";
import { ControllerResult } from "./controller-result.interface";

export default class PostController {

  public static create(post: Post): Promise<ControllerResult> {
    return new Promise((resolve, reject) => {
      post.save()
        .then((result: Post) => resolve({ status: 201, json: result }))
        .catch((err: any) => reject({ status: 500, msg: `DB Error: ${err.toString()}` }));
    });
  }

  public static list(): Promise<ControllerResult> {
    return new Promise((resolve, reject) => {
      PostModel.find()
        .then((result: Post[]) => resolve({ status: 200, json: result }))
        .catch((err: any) => reject({ status: 500, msg: `DB Error: ${err.toString()}` }));
    });
  }

  public static get(id: string): Promise<ControllerResult> {
    return new Promise((resolve, reject) => {
      PostModel.findOne({ _id: id })
        .then((result: Post) => resolve({ status: 200, json: result }))
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