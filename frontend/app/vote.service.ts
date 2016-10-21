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
    private joined: boolean;
    private username: string;
    private currentVote: Vote;
    private historicVote:Vote[];
    private us: UserService;
    private decisionObject:VoteOpinion;
    private decisions : Opinion;
    //private cs:ChatService;
    private socket:any;

    constructor() {

        this.username = this.us.getUsername();
        this.socket = this.us.getSocketConnection();
        this.setListener();
    }

    private setListener(){
        this.socket.on('updateVote',(updatedVote:Vote)=>{
           this.currentVote=updatedVote;
        });
        this.socket.on('newVote',(newVote:Vote)=>{
            this.currentVote=newVote;
        });
    }

    public getCurrentVote():Vote{
        return this.currentVote;
    }

    public getHistVote():Vote[]{
        return this.historicVote;
    }

    public createVote(actVote:Vote,cb: (currentVote: Vote)=>void) {
        this.socket.emit('sendVote',actVote);
        this.socket.on('sentVoteSucceded', (updatedVote : Vote)=>{
            this.currentVote=updatedVote;
            return this.currentVote;
        });
        this.socket.on('sentVoteFailed', ()=>{
            this.currentVote= null;
        });
        cb(this.currentVote);
    }


    public getOptions():any{
        return this.currentVote.options;
    }


    public updateOption(updatevote:Vote,cb:(updatedvote:Vote)=> Vote):void{
        //this.socket.emit('updateOptions',{updatevote : Vote});
        this.socket.on('updateOptionsSucceded', ()=>{
            cb(this.currentVote);
        });
        this.socket.on('updateOptionsFailed', ()=>{
            cb(null);
        });

    };

    public setOpinion(decisions:Opinion[]){

        //decisionObject.vote_id=this.currentVote._id;
        //decisionObject.decision=decisions;
        //VoteOpinions:
        //this.socket.emit('sendOpinion',{decisionObject});
        this.socket.on('sendOpinionsSucceded', ()=>{

        });
        this.socket.on('sendOpinionsFailed', ()=>{

        });
        return true;
    }

}

export interface VoteOpinion{
    vote_id:string;
    decision:Opinion[];
}

export interface Opinion{
    option_title: string;
    decision:boolean;
}[];

export interface Vote{
    _id: string;
    title: string;
    creator?: string;
    opened_at?: Date;
    closed_at?: Date;
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
