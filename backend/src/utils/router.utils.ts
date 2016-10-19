import * as express from "express";
import { Result } from "../controller/result.interface";

export type DateFilter = {
  $lt?: Date;
  $gt?: Date;
  $and?: DateFilter[];
  $or?: DateFilter[];
};

export function sendResult(response: express.Response, result: Result): express.Response {
  response.status(result.status);

  if (result.error)
    return response.json({
      msg: result.error || 'Internal Error',
      error: result.error || null
    });

  if (result.json)
    return response.json(result.json);
  else if (result.msg)
    return response.send(result.msg);

  return response.send(result);
}

export function generateDateFilter(before: Date|null, after: Date|null): DateFilter|null {
  let beforeFilter: DateFilter|null = null,
    afterFilter: DateFilter|null = null;

  if (before)
    beforeFilter = { $lt: before };
  if (after)
    afterFilter = { $gt: after };

  if (beforeFilter && afterFilter)
    return { $and: [ beforeFilter, afterFilter ] };
  else if (beforeFilter || afterFilter)
    return beforeFilter || afterFilter;
  return null;
}