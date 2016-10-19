import { Result } from "../utils/result.interface";
import { handleDBError } from "../utils/controller.utils";
import { User, UserModel } from "../models/user.model";

export default class UserController {

  public static create(user: User): Promise<Result> {
    return new Promise((resolve, reject) => {
      user.save()
        .then((result: User) => resolve({
          status: 201,
          json: result
        }))
        .catch((err: any) => reject(handleDBError(err)));
    });
  }

  public static list(conditions: any = {}): Promise<Result> {
    return new Promise((resolve, reject) => {
      UserModel.find(conditions)
        .then((result: User[]) => resolve({
          status: 200,
          json: result
        }))
        .catch((err: any) => reject(handleDBError(err)));
    });
  }

  public static get(username: string): Promise<Result> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ username: username })
        .then((result: User) => resolve({
          status: 200,
          json: result
        }))
        .catch((err: any) => reject(handleDBError(err)));
    });
  }
}