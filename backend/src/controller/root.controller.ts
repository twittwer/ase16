import { Result } from "./result.interface";

export default class RootController {
  public static welcome(): Promise<Result> {
    return new Promise((resolve) => {
      resolve({
        status: 200,
        msg: 'Backend - It works!<br/>Welcome and try <a href="/posts">/posts</a> and <a href="/posts/1">/posts/:id</a>.'
      });
    });
  }
}