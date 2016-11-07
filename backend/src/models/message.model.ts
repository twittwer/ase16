import * as mongoose from "mongoose";

export interface Message extends mongoose.Document {
  _id: any;
  text: string;
  author?: string;
  sent_at?: Date;
  room: string;
}

let messageSchema: mongoose.Schema = new mongoose.Schema({
  text: String,
  author: String,
  sent_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  room: {
    type: String,
    required: true,
    default:'default',
    index: true
  }
});

export const MessageModel = mongoose.model<Message>('Message', messageSchema);