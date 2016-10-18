import * as mongoose from "mongoose";

export interface Chatroom extends mongoose.Document {
  _id: string;
  name: string;
  members: string[];
  vote: Date;
}

let chatroomSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  members: [String],
  vote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }
});

export const ChatroomModel = mongoose.model<Chatroom>('Chatroom', chatroomSchema);