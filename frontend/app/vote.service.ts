/**
 * Created by Ines Frey on 20.10.2016.
 */


import {EventEmitter, Injectable} from '@angular/core';
import {UserService} from 'user.service';
import {ChatService} from 'chat.service';
import * as io from "socket.io-client";
import {bootstrap} from "@angular/upgrade/src/angular_js";

@Injectable()
export class VoteService {
    private joined: boolean;
    private username: string;
    private vote: Vote;
    private us: UserService;
    private cs:ChatService;
    private socket;
    private upVote:boolean;

    constructor() {
        this.username = this.us.getUsername();
        this.socket = this.us.getSocketConnection();
        this.vote = this.cs.getVote();
    }

    getVote():Vote{
        return this.vote;
    }
    createVote(title:string,):Vote{
        io.emit('sendVote',{});
        io.on('sentVoteSucceded', (updatedVote : Vote)=>{

            this.vote=updatedVote;
            return this.vote
        });
        io.on('sentVoteFail', ()=>{
            return false;
        });
        io.on('newVote', ()=>{

        });
        io.on('updateVote', (upVote:Vote)=>{
            this.vote=upVote;
        });
        return this.vote;
    }

    updateOpinion():boolean{
        io.emit('updateOptions',{});
        io.on('updateOptionsSucceded', ()=>{

        });
        io.on('updateOptionsFailed', ()=>{

        });
        return true;
    }

    setOpinion(opt:boolean):boolean{
        io.emit('sendOptions',{opt});
        io.on('sendOptionsSucceded', ()=>{

        });
        io.on('sendOptionsFailed', ()=>{

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