import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io from 'socket.io-client';

const DEBUG: boolean = true;

@Injectable()
export class UserService {
    private socket: SocketIOClient.Socket;
    private username: string;
    private cookieName: string;

    /* Init */
    constructor() {
        this.socket = io.connect('http://api.local/');
        this.username = null;
        this.cookieName = 'ChatApp-ASE16';
        this.checkForExistingCookie();
    }

    private checkForExistingCookie() {
        if (Cookie.get(this.cookieName)) {
            this.username = Cookie.get(this.cookieName);
        }
    }

    /* Getter */
    public getUsername(): string {
        return this.username;
    }

    public getSocketConnection(): SocketIOClient.Socket {
        return this.socket;
    }

    /* Sender */
    public reg(username: string, cb: (success: boolean)=>void): void {
        if (DEBUG) {
            this.username = 'FooBar';
            cb(true);
        }else {
            if (username !== null && username !== '') {
                this.socket.emit('register', { username: username });
                this.socket.on('registered', (user: User)=> {
                    this.username = user.username;
                    Cookie.set(this.cookieName, this.username);
                    cb(true);
                });
            } else {
                cb(false);
            }
        }
    };
}

export interface User {
    _id?: string;
    username: string;
}