import * as express from "express";
import { Result } from "./result.interface";

export type DateFilter = {
  $lte?: Date;
  $gte?: Date;
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

export function generateDateFilter(before: Date, after: Date): DateFilter {
  let beforeFilter: DateFilter = null,
    afterFilter: DateFilter = null;

  if (before)
    beforeFilter = { $lte: before };
  if (after)
    afterFilter = { $gte: after };

  if (beforeFilter && afterFilter)
    return { $and: [ beforeFilter, afterFilter ] };
  else if (beforeFilter || afterFilter)
    return beforeFilter || afterFilter;
  return null;
}