import { SocketServer, Socket } from "./socket-connector";
import { Vote, VoteModel } from "../models/vote.model";
import { SimpleError } from "../utils/error.interface";
import { handleDBError } from "../utils/controller.utils";

enum EventType { Create, Update }

const EVENTS = {
  SEND_VOTE: 'sendVote',
  UPDATE_OPTIONS: 'updateOptions',
  SEND_OPINION: 'sendOpinion'
};

/* Interfaces */
interface VoteData {
  vote: Vote
}

interface VoteRef {
  vote_id: string;
}

interface UpdateOptionsData extends VoteRef {
  options: {
    title: string;
    description?: string;
  }[];
}

interface SendOpinionData extends VoteRef {
  options: {
    title: string;
    decision: boolean;
  }[];
}

/* Controller */
export default class VoteSocketController {
  private socketServer: SocketServer;
  private socket: Socket;

  private constructor(socket: Socket, socketServer: SocketServer) {
    this.socketServer = socketServer;
    this.socket = socket;

    socket.on(EVENTS.SEND_VOTE, (data: VoteData) => this.handleSendVote(data));
    socket.on(EVENTS.UPDATE_OPTIONS, (data: UpdateOptionsData) => this.handleUpdateOptions(data));
    socket.on(EVENTS.SEND_OPINION, (data: SendOpinionData) => this.handleSendOpinion(data));
  }

  public static bootstrap(socket: Socket, socketServer: SocketServer): void {
    new VoteSocketController(socket, socketServer);
  }

  /* Handle Events */
  private handleSendVote(data: VoteData) {
    let vote = data.vote;
    if (vote._id) {
      if (vote.creator !== this.socket.username)
        this.responseSendVote({ msg: 'forbidden update' }, vote, false);
      else
        VoteManager.updateVote(vote)
          .then((vote: Vote) => this.responseSendVote(null, vote, false))
          .catch((err: SimpleError) => this.responseSendVote(err, vote, false));
    } else {
      VoteManager.createVote(vote)
        .then((vote: Vote) => this.responseSendVote(null, vote, true))
        .catch((err: SimpleError) => this.responseSendVote(err, vote, true));
    }
  }

  private handleUpdateOptions(data: UpdateOptionsData) {
    // TODO: handle update vote options
    // VoteModel.findOne({ _id: data.vote_id })
    //   .then()
    //   .catch((err: any) => this.responseUpdateOptions({ msg: handleDBError(err).msg }, null));
  }

  private handleSendOpinion(data: SendOpinionData) {
    // TODO: handle opinions
  }

  /* Send Events */
  private responseSendVote(err: SimpleError, vote: Vote, isNewVote: boolean) {
    this.responseVoteEvent(isNewVote ? EventType.Create : EventType.Update, EVENTS.SEND_VOTE, err, vote);
  }

  private responseUpdateOptions(err: SimpleError, vote: Vote) {
    this.responseVoteEvent(EventType.Update, EVENTS.UPDATE_OPTIONS, err, vote);
  }

  private responseSendOpinion(err: SimpleError, vote: Vote) {
    this.responseVoteEvent(EventType.Update, EVENTS.SEND_OPINION, err, vote);
  }

  private responseVoteEvent(eventType: EventType, event: string, err: SimpleError, vote: Vote) {
    if (err)
      this.socket.emit(event + 'Failed', { msg: err.msg, vote: vote });

    this.socket.emit(event + 'Succeeded', { vote: vote });

    let broadcastEvent;
    switch (eventType) {
      case EventType.Create:
        broadcastEvent = 'newVote';
        break;
      case EventType.Update:
        broadcastEvent = 'updateVote';
        break;
    }
    this.socket.broadcast.in(vote.room).emit(broadcastEvent, { vote: vote });
  }
}

class VoteManager {

  public static createVote(vote: Vote): Promise<Vote|SimpleError> {
    return new Promise((resolve, reject) => {
      VoteModel.count({ room: vote.room, closed_at: { $gt: new Date() } })
        .then((count: number) => {
          if (count)
            reject({ msg: 'room has already a opened vote' });
          vote.save()
            .then(resolve)
            .catch((err: any) => reject({ msg: handleDBError(err).msg }));
        })
        .catch((err: any) => reject({ msg: handleDBError(err).msg }));
    });
  }

  public static updateVote(updatedVote: Vote): Promise<Vote|SimpleError> {
    return new Promise((resolve, reject) => {
      VoteModel.findOne({ _id: updatedVote._id })
        .then((vote: Vote) => {
          if (!vote)
            reject({ msg: 'vote not found' });
          if (vote.creator !== updatedVote.creator)
            reject({ msg: 'forbidden update' });
          if (vote.closed_at.getTime() < new Date().getTime())
            reject({ msg: 'vote already closed' });
          Object.assign(vote, updatedVote);
          vote.save()
            .then(resolve)
            .catch((err: any) => reject({ msg: handleDBError(err).msg }));
        })
        .catch((err: any) => reject({ msg: handleDBError(err).msg }));
    });
  }
}