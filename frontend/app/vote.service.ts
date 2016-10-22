import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import io = require('socket.io-client');

const DEBUG: boolean = true;

@Injectable()
export class VoteService {
    private socket: SocketIOClient.Socket;
    private currentVote: Vote;
    private historicVotes: Vote[];

    /* Init */
    constructor(private us: UserService) {
        this.socket = this.us.getSocketConnection();
        this.currentVote = null;
        this.historicVotes = [];
        this.setListener();
    }

    private setListener() {
        this.socket.on('updateVote', (updatedVote: Vote)=> {
            this.currentVote = updatedVote;
            let actualDate=new Date;
            if( this.currentVote.closed_at < actualDate){
                this.historicVotes.push(this.currentVote);
                this.currentVote=null;
            }
        });
        this.socket.on('newVote', (newVote: Vote)=> {
            this.currentVote = newVote;
            let actualDate=new Date;
            if( this.currentVote.closed_at < actualDate){
                this.historicVotes.push(this.currentVote);
                this.currentVote=null;
            }
        });
    }

    /* Getter */
    public getCurrentVote(): Vote {
        return this.currentVote;
    }

    public getHistoricVotes(): Vote[] {
        return this.historicVotes;
    }

    public getOptions(): Option[] {
        return this.currentVote.options;
    }

    /* Sender */
    public sendVote(vote: Vote, cb: (success: boolean)=>void) {
        if (DEBUG) {
            if (!vote._id) {
                vote._id = 'ab12bn3h4';
                vote.creator = this.us.getUsername();
                vote.opened_at = new Date();
            }
            this.currentVote = vote;
            cb(true);
        } else {
            this.socket.emit('sendVote', {vote: vote});
            this.socket.on('sentVoteSucceeded', ()=> {
                console.log("sentVote Success");
                cb(true);
            });
            this.socket.on('sentVoteFailed', ()=> {
                this.currentVote = null;
                cb(false);
            });
        }
    }

    public updateOptions(options: Option[], cb: (success: boolean)=> void): void {
        if (DEBUG) {
            this.currentVote.options = options;
            this.currentVote.options.forEach((option: Option, index: number, options: Option[])=> {
                options[index].creator = this.us.getUsername();
                options[index].opinions = [];
            });
            cb(true);
        } else {
            let optionData: OptionsData = {
                vote_id: this.currentVote._id,
                options: options
            };
            this.socket.emit('updateOptions', optionData);
            this.socket.on('updateOptionsSucceeded', ()=> {
                cb(true);
            });
            this.socket.on('updateOptionsFailed', ()=> {
                cb(false);
            });
        }
    };

    public sendOpinion(decisions: Opinion[], cb: (success: boolean)=> void): void {
        if (DEBUG) {
            if (this.currentVote.options.length) {
                this.currentVote.options[0].opinions.push({
                    decision: decisions[0].decision,
                    decider: this.us.getUsername()
                });
                if (decisions[0].decision)
                    this.currentVote.options[0].yes_votes++;
                else
                    this.currentVote.options[0].no_votes++;
            }
            cb(true);
        } else {
            let decisionObject: OpinionData = {
                vote_id: this.currentVote._id,
                decisions: decisions
            };
            this.socket.emit('sendOpinion', decisionObject);
            this.socket.on('sendOpinionSucceeded', ()=> {
                cb(true);
            });
            this.socket.on('sendOpinionFailed', ()=> {
                cb(false);
            });
        }
    }

}

export interface Vote {
    _id?: string;
    title: string;
    room: string;
    creator?: string;
    opened_at?: Date;
    closed_at?: Date;
    options: Option[];
}

export interface Option {
    title: string;
    creator?: string;
    yes_votes?: number;
    no_votes?: number;
    opinions?: {
        decider?: string;
        decision?: boolean;
    }[]
}

interface VoteRef {
    vote_id: string;
}

export interface OptionsData extends VoteRef {
    options: Option[];
}

export interface OpinionData extends VoteRef {
    decisions: Opinion[];
}

export interface Opinion {
    option_title: string;
    decision: boolean;
}
