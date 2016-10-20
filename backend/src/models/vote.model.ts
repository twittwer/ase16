import * as mongoose from "mongoose";

export interface Vote extends mongoose.Document {
  _id: string;
  title: string;
  description?: string;
  creator?: string;
  opened_at?: Date;
  closed_at?: Date;
  room: string;
  options: {
    title: string;
    description?: string;
    yes_votes?: number;
    no_votes?: number;
    opinions: {
      decider: string;
      decision: boolean;
    }[];
  }[];
}

let voteSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  creator: {
    type: String,
    required: true
  },
  opened_at: {
    type: Date,
    default: Date.now
  },
  closed_at: Date,
  room: {
    type: String,
    required: true,
    default: 'default'
  },
  options: [ {
    title: {
      type: String,
      required: true
    },
    description: String,
    yes_vote: {
      type: Number,
      default: 0
    },
    no_vote: {
      type: Number,
      default: 0
    },
    opinions: [ {
      decider: {
        type: String,
        required: true
      },
      decision: {
        type: Boolean,
        required: true
      }
    } ]
  } ]
});

export const VoteModel = mongoose.model<Vote>('Vote', voteSchema);