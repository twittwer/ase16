/**
 * Created by Ines Frey on 20.10.2016.
 */


import {EventEmitter, Injectable} from '@angular/core';
import {UserService} from './user.service';
//import {ChatService} from './chat.service';
import io = require("socket.io-client");
import {bootstrap} from "@angular/upgrade/src/angular_js";

@Injectable()
export class VoteService {
    private currentVote: Vote;
    private historicVote: Vote[];
    // private decisionObject:VoteOpinion;
    private socket: SocketIOClient.Socket;

    constructor(private us: UserService) {
        this.socket = this.us.getSocketConnection();
        this.setListener();
    }

    private setListener() {
        this.socket.on('updateVote', (updatedVote: Vote)=> {
            this.currentVote = updatedVote;
        });
        this.socket.on('newVote', (newVote: Vote)=> {
            this.currentVote = newVote;
        });
    }

    public getCurrentVote(): Vote {
        return this.currentVote;
    }

    public getHistVote(): Vote[] {
        return this.historicVote;
    }

    public sendVote(actVote: Vote, cb: (currentVote: Vote)=>void) {
        if (!actVote._id)
            actVote._id = 'ab12bn3h4';
        this.currentVote = actVote;
        cb(this.currentVote);

        /*this.socket.emit('sendVote', actVote);
        this.socket.on('sentVoteSucceded', (updatedVote: Vote)=> {
            this.currentVote = updatedVote;
            cb(this.currentVote);
        });
        this.socket.on('sentVoteFailed', ()=> {
            this.currentVote = null;
            cb(this.currentVote);
        });*/
    }

    public getOptions(): any {
        return this.currentVote.options;
    }


    public updateOption(updatevote: Vote, cb: (success: boolean)=> void): void {
        //this.socket.emit('updateOptions',{updatevote : Vote});
        this.socket.on('updateOptionsSucceded', ()=> {
            cb(true);
        });
        this.socket.on('updateOptionsFailed', ()=> {
            cb(false);
        });

    };

    public setOpinion(decisions: Opinion[], cb: any) {
        let decisionObject: VoteOpinion;
        decisionObject.vote_id = this.currentVote._id;
        decisionObject.decisions = decisions;
        this.socket.emit('sendOpinion', decisionObject);
        this.socket.on('sendOpinionsSucceded', ()=> {
            cb(true);
        });
        this.socket.on('sendOpinionsFailed', ()=> {
            cb(false);
        });
        return true;
    }

}

export interface VoteOpinion {
    vote_id: string;
    decisions: Opinion[];
}

export interface Opinion {
    option_title: string;
    decision: boolean;
}
;


export interface Vote {
    _id?: string;
    title: string;
    room:string;
    creator?: string;
    opened_at?: Date;
    closed_at?: Date;
    options: {
        title: string;
        description?: string;
        yes_votes?: number;
        no_votes?: number;
        opinions?: {
            decider?: string;
            decision?: boolean;
        }[];
    }[];
}
