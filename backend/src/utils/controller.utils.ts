import { Result } from "../controller/result.interface";

export function handleDBError(err: any): Result {
  let result: Result = {
    status: 500,
    msg: `DB Error: ${err.toString()}`,
    error: err
  };
  if (err.name === 'CastError') {
    result.status = 400;
    result.msg = `Invalid ${err.path}`;
  }
  return result;
}