import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
  _id: any;
  username: string;
}

let userSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
});

export const UserModel = mongoose.model<User>('User', userSchema);