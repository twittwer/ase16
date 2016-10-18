import * as mongoose from "mongoose";

export interface Message extends mongoose.Document {
  _id: string;
  text: string;
  author: string;
  send_at: Date;
}

let messageSchema: mongoose.Schema = new mongoose.Schema({
  text: String,
  author: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

export const MessageModel = mongoose.model<Message>('Message', messageSchema);