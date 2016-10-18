import * as express from "express";

export interface ControllerResult {
  status: number;
  msg?: string;
  json?: any;
  error?: any;
}

export function sendControllerResult(result: ControllerResult, response: express.Response): void {
  response.status(result.status);
  if (result.json) response.json(result.json);
  else if (result.msg) response.send(result.msg);
  else response.send(result);
}

export default ControllerResult;