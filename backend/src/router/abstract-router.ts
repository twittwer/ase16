import * as express from "express";

abstract class AbstractRouter {
  protected _router: express.Router;

  constructor() {
    this._router = express.Router();
    this.configure();
  }

  abstract configure(): void;

  public getRouter(): express.Router {
    return this._router;
  }
}

export default AbstractRouter;