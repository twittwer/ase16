import { MessageModel, Message } from "../models/message.model";
import { Result } from "./result.interface";
import { handleDBError } from "../utils/controller.utils";

export default class MessageController {

  public static create(message: Message): Promise<Result> {
    return new Promise((resolve, reject) => {
      message.save()
        .then((result: Message) => resolve({
          status: 201,
          json: result
        }))
        .catch((err: any) => reject(handleDBError(err)));
    });
  }

  public static list(conditions: any = {}): Promise<Result> {
    return new Promise((resolve, reject) => {
      MessageModel.find(conditions)
        .then((result: Message[]) => resolve({
          status: 200,
          json: result
        }))
        .catch((err: any) => reject(handleDBError(err)));
    });
  }

  public static get(id: string): Promise<Result> {
    return new Promise((resolve, reject) => {
      MessageModel.findOne({ _id: id })
        .then((result: Message) => resolve({
          status: 200,
          json: result
        }))
        .catch((err: any) => reject(handleDBError(err)));
    });
  }
}