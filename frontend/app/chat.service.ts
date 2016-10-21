// /**
//  * Created by Ines Frey on 20.10.2016.
//  */
//
// //noinspection TypeScriptCheckImport
// import {EventEmitter, Injectable} from '@angular/core';
// import {UserService} from './user.service';
// import * as io from "socket.io-client";
//
// @Injectable()
// export class ChatService {
//     private joined:boolean;
//     private username:string;
//     private messages:Message[];
//     private vote:Vote;
//     private us:UserService;
//     private socket: SocketIOClient.Socket;
//
//     constructor(){
//         this.username=this.us.getUsername();
//         this.socket=this.us.getSocketConnection();
//     }
//
//     /**
//      * return last 20 Messages
//      * @return {Message[]}
//      */
//     getMessages():Message[]{
//         return this.messages;
//     }
//
//     getVote():Vote{
//         return this.vote;
//     }
//
//     /**
//      * @return
//      */
//     joinRoom() : Message[]{
//         if (this.socket==null) {
//            this.socket = io.connect('http://api.local');
//         }
//         io.emit("register", {room:'default'});
//
//         io.on('joinedRoom', ( room: 'default', joined: boolean, msg: string, to: Date,
//                               vote?: Vote, msgs?: Message[], from?: Date)=>{
//             if (joined==true){
//                 this.joined=true;
//                 this.messages=msgs;
//                 if (vote!==null){
//                     this.vote=vote;
//                 }
//             } else {
//                 this.joined=false;
//                 return -1;
//             }
//         });
//
//         return this.messages;
//     }
//
//
//     sendMessage(msg:String):string{
//          if (this.socket==null) {
//             this.socket= io('http://api.local');
//          }
//         io.emit("sendMessage", {room:'default', msg});
//         io.on("newMessage",(room: 'default', msg: Message )=>{
//             this.messages.push(msg);
//             return "Message was successfully";
//         });
//         io.on("sendMessageFailed",({ msg: string, error: {}, failedMsg: Message })=>{
//             //return (failedMsg.text + ' Message could not be sent');
//         });
//         return "";
//     }
//
// }
//
// export interface Message {
//     _id: string;
//     text: string;
//     author: string;
//     sent_at: Date;
//     room: string;
// }
//
// export interface Vote{
//     _id: string;
//     title: string;
//     creator?: string;
//     opened_at?: Date;
//     closed_at?: Date;
//     options: {
//         title: string;
//         description?: string;
//         yes_votes?: number;
//         no_votes?: number;
//         opinions: {
//             decider: string;
//             decision: boolean;
//         }[];
//     }[];
// }
