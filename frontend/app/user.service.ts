/**
 * Created by Ines Frey on 19.10.2016.
 */

import { EventEmitter, Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io from 'socket.io-client';


@Injectable()
export class UserService {
    private username: string = "";
    private socket: SocketIOClient.Socket = null;
    private cookiename: string;

    constructor() {
        this.username = null;
        this.cookiename = "ChatApp";
        this.socket = io.connect('http://api.local/');
        this.checkNameExists();
    }

    public getUsername(): string {
        return this.username;
    }

    public getSocketConnection(): SocketIOClient.Socket {
        return this.socket;
    }

    /**
     * register a User
     * @param user {String} Username
     * @return data
     */
    public reg(user: string, cb: (username: string)=>void): void {
        this.username = 'FooBar';
        cb('FooBar');

        /*if (user !== null && user !== "") {
            this.socket.emit("register", {username: user});
            this.socket.on('registered', (user: any)=> {
                this.username = user.username;
                Cookie.set(this.cookiename, this.username);
                cb(this.username);
            });
        } else {
            cb(null);
        }*/
    };

    /**
     * Check if Application know the username
     * @param username
     */
    private checkNameExists() {
        if (Cookie.get(this.cookiename)) {
            this.username = Cookie.get(this.cookiename);
        }
    }
}
