import * as Mongoose from "mongoose";

export interface Post extends Mongoose.Document {
  _id: string;
  title: string;
  text: string;
  author: string;
  created_at: Date;
}

let postSchema: Mongoose.Schema = new Mongoose.Schema({
  title: String,
  author: String,
  text: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

export const PostModel = Mongoose.model<Post>('Post', postSchema);