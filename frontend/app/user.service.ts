/**
 * Created by Ines Frey on 19.10.2016.
 */

import {EventEmitter, Injectable} from '@angular/core';
import { Cookie } from 'ng2-cookies';
import * as io from "socket.io-client"


@Injectable()
export class UserService {
    private username:string="";
    private socket=null;
    private cookiename:string;

    constructor(){
        this.username="";
        this.cookiename="ChatApp";
        this.socket=io('http://api.local/');
        this.checkNameExists();
    }

    public getUsername():string{
        return this.username;
    }

    public getSocketConnection(): io {
        return this.socket;
    }
    /**
     * register a User
     * @param user {String} Username
     * @return data
     */
    public reg(user: string): string {
        if (user!==null && user!=="") {
            this.socket.emit("register", {username:user});
            this.socket.on('registered', (user:any)=> {
                this.username = user.username;
                Cookie.set(this.cookiename,this.username);
                return this.username;
            });
        } else {
            return null;
        }
    };

    /**
     * Check if Application know the username
     * @param username
     */
    private checkNameExists(){
        if (Cookie.check(this.cookiename) ){
            this.username=Cookie.get(this.cookiename);
        }
    }

    public getUsername():string{
        return this.username;
    }

    disconnect():boolean{
        if (this.username==""){
            return false;
        } else  {
            if (this.socket==null){
                return false;
            } else{
                this.socket.emit('disconnect', {username:this.username});
                this.socket.on('disconnected',()=>{
                    this.socket.close();
                    return true;
                });

            }
        }
    }
}