import { SocketServer, Socket } from "./socket-connector";
import { Vote, VoteModel, Option, Opinion } from "../models/vote.model";
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

interface OptionsData extends VoteRef {
  options: Option[];
}

interface Decision { // ~> Opinion
  option_title: string;
  decision: boolean;
}

interface OpinionData extends VoteRef {
  decisions: Decision[];
}

/* Controller */
export default class VoteSocketController {
  private socketServer: SocketServer;
  private socket: Socket;

  private constructor(socket: Socket, socketServer: SocketServer) {
    this.socketServer = socketServer;
    this.socket = socket;

    socket.on(EVENTS.SEND_VOTE, (data: VoteData) => this.handleSendVote(data));
    socket.on(EVENTS.UPDATE_OPTIONS, (data: OptionsData) => this.handleUpdateOptions(data));
    socket.on(EVENTS.SEND_OPINION, (data: OpinionData) => this.handleSendOpinion(data));
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

  private handleUpdateOptions(data: OptionsData) {
    VoteManager.updateVoteOptions(data.vote_id, data.options, this.socket.username)
      .then((vote: Vote) => this.responseUpdateOptions(null, vote))
      .catch((err: any) => this.responseUpdateOptions({ msg: handleDBError(err).msg }, null));
  }

  private handleSendOpinion(data: OpinionData) {
    VoteManager.setVoteOpinion(data.vote_id, data.decisions, this.socket.username)
      .then((vote: Vote) => this.responseSendOpinion(null, vote))
      .catch((err: any) => this.responseSendOpinion({ msg: handleDBError(err).msg }, null));
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

    let broadcastEvent: any;
    switch (eventType) {
      case EventType.Create:
        broadcastEvent = 'newVote';
        break;
      case EventType.Update:
        broadcastEvent = 'updateVote';
        break;
    }
    this.socket.broadcast.in(vote.room).emit(broadcastEvent, vote);
  }
}

class VoteManager {

  public static createVote(vote: Vote): Promise<Vote|SimpleError> {
    console.info('createVote');

    return new Promise((resolve, reject) => {
      VoteModel.count({ room: vote.room, closed_at: { $or: [ { $gt: new Date() }, { $eq: null } ] } })
        .then((count: number) => {

          // check room conditions
          if (count)
            reject({ msg: 'room has already an opened vote' });

          // save created vote
          vote.save()
            .then(resolve)
            .catch((err: any) => reject({ msg: handleDBError(err).msg }));
        })
        .catch((err: any) => reject({ msg: handleDBError(err).msg }));
    });
  }

  public static updateVote(updatedVote: Vote): Promise<Vote|SimpleError> {
    console.info('updateVote');

    return new Promise((resolve, reject) => {
      VoteModel.findOne({ _id: updatedVote._id })
        .then((vote: Vote) => {

          // check vote conditions
          if (!vote)
            reject({ msg: 'vote not found' });
          if (vote.creator !== updatedVote.creator)
            reject({ msg: 'forbidden update' });
          if (vote.closed_at.getTime() < new Date().getTime())
            reject({ msg: 'vote already closed' });

          // update vote
          Object.assign(vote, updatedVote);

          // save updated vote
          vote.save()
            .then(resolve)
            .catch((err: any) => reject({ msg: handleDBError(err).msg }));
        })
        .catch((err: any) => reject({ msg: handleDBError(err).msg }));
    });
  }

  public static updateVoteOptions(voteId: string, newOptions: Option[], editor: string): Promise<Vote|SimpleError> {
    console.info('updateVoteOptions');

    return new Promise((resolve, reject) => {
      VoteModel.findOne({ _id: voteId })
        .then((vote: Vote) => {

          // check vote conditions
          if (!vote)
            reject({ msg: 'vote not found' });
          if (vote.closed_at.getTime() < new Date().getTime())
            reject({ msg: 'vote already closed' });

          // check for deleted options
          vote.options.forEach((oldOption: Option, oldOptionIndex: number, oldOptions: Option[]) => {
            let foundMatch: boolean = false;
            newOptions.forEach((newOption: Option, newOptionindex: number) => {
              if (newOption.title === oldOption.title) {
                delete newOptions[ newOptionindex ];
                foundMatch = true;
              }
            });
            if (!foundMatch) {
              if (oldOption.creator !== editor) {
                reject({ msg: 'forbidden update' });
              } else {
                delete oldOptions[ oldOptionIndex ];
              }
            }
          });

          // add created options
          newOptions.forEach((newOption: Option) => {
            newOption.creator = editor;
            newOption.opinions = [];
            vote.options.push(newOption);
          });

          // save updated vote
          vote.save()
            .then(resolve)
            .catch((err: any) => reject({ msg: handleDBError(err).msg }));
        })
        .catch((err: any) => reject({ msg: handleDBError(err).msg }));
    });
  }

  public static setVoteOpinion(voteId: string, decisions: Decision[], decider: string): Promise<Vote|SimpleError> {
    console.info('setVoteOpinion');

    return new Promise((resolve, reject) => {
      VoteModel.findOne({ _id: voteId })
        .then((vote: Vote) => {

          // check vote conditions
          if (!vote)
            reject({ msg: 'vote not found' });
          if (vote.closed_at.getTime() < new Date().getTime())
            reject({ msg: 'vote already closed' });

          // set opinions | loop sent decisions
          let rejectedDecisions: number = 0;
          decisions.forEach((decision: Decision) => {
            vote.options.forEach((option: Option) => {
              if (option.title === decision.option_title) {
                // option of decision found

                // check for previous votes of user
                let alreadyVoted: boolean = false;
                option.opinions.forEach((opinion: Opinion) => {
                  if (opinion.decider === decider) { // user voted already
                    alreadyVoted = true;
                    // count as rejected if new decision differs from older opinion
                    if (decision.decision !== opinion.decision)
                      rejectedDecisions++;
                  }
                });

                // add new decision to opinions
                if (!alreadyVoted) {
                  option.opinions.push({
                    decider: decider,
                    decision: decision.decision
                  });
                  if (decision.decision)
                    option.yes_votes++;
                  else
                    option.no_votes++;
                }
              }
            });
          });

          // reject whole request, if all decisions were rejected
          if (rejectedDecisions === decisions.length) {
            reject({ msg: 'user voted already' });
          }

          // save updated vote
          vote.save()
            .then(resolve)
            .catch((err: any) => reject({ msg: handleDBError(err).msg }));
        })
        .catch((err: any) => reject({ msg: handleDBError(err).msg }));
    });
  }
}