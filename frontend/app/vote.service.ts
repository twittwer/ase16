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
    //private cs:ChatService;
    private socket:any;
    private upVote:boolean;

    constructor() {

        this.username = this.us.getUsername();
        this.socket = this.us.getSocketConnection();

    }

    private setListener(){
        this.socket.on('updateVote')
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
        this.socket.on('sentVoteFail', ()=>{
            return null;
        });
        this.socket.on('newVote', (newVote : Vote)=>{
            this.currentVote=newVote;
        });
        this.socket.on('updateVote', (upVote:Vote)=>{
            this.currentVote=upVote;
        });

        cb(this.currentVote);
    }

    public closeVote(closeDate:Date){
        this.socket.emit('closeVote',closeDate);
        this.

    }

    public getOptions():any{
        return this.currentVote.options;
    }


    public updateOpinion():boolean{
        this.socket.emit('updateOptions',{});
        this.socket.on('updateOptionsSucceded', ()=>{

        });
        this.socket.on('updateOptionsFailed', ()=>{

        });
        return true;
    }

    public setOpinion(opt:boolean):boolean{
        this.socket.emit('sendOptions',{opt});
        this.socket.on('sendOptionsSucceded', ()=>{

        });
        this.socket.on('sendOptionsFailed', ()=>{

        });
        return true;
    }

}

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
