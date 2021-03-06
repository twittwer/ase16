import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io from 'socket.io-client';
import { SimpleError } from './interfaces/simple-error';
import { User } from './interfaces/user';

// use environment.ts
const DEBUG = true;
// const DEBUG = false;

@Injectable()
export class UserService {
  private serverUrl: string = 'http://api.local/';
  private cookieName: string = 'ChatApp-ASE16';
  private socket: SocketIOClient.Socket;
  private username: string;

  /* Init */
  constructor () {
    this.socket = io.connect( this.serverUrl );
    this.username = null;
    this.checkForExistingCookie();
  }

  private checkForExistingCookie () {
    if ( Cookie.get( this.cookieName ) ) {
      this.login( Cookie.get( this.cookieName ), ( success: boolean ) => {
        if ( !success ) {
          this.username = null;
        }
      } );
    }
  }

  /* Getter */
  public isLoggedIn (): boolean {
    return Boolean( this.username );
  }

  public getUsername (): string {
    return this.username;
  }

  public getSocketConnection (): SocketIOClient.Socket {
    return this.socket;
  }

  /* Sender */
  public login ( username: string, cb: ( success: boolean ) => void ): void {
    if ( DEBUG ) {
      this.username = 'FooBar';
      Cookie.set( this.cookieName, this.username );
      cb( true );
    } else {
      if ( username !== null && username !== '' ) {
        console.log( 'register user: ', username );
        this.socket.emit( 'register', { username: username } );
        this.socket.on( 'registered', ( user: User ) => {
          console.log( 'registered > ', user );
          this.username = user.username;
          Cookie.set( this.cookieName, this.username );
          cb( true );
        } );
        this.socket.on( 'registrationFailed', ( errorObject: SimpleError ) => {
          console.log( 'registrationFailed > ', errorObject );
          this.username = errorObject.msg;
          cb( false );
        } );
      } else {
        cb( false );
      }
    }
  }

  public logout (): void {
    this.socket.disconnect();
    Cookie.delete( this.cookieName );
    this.username = null;
    this.socket = io.connect( this.serverUrl );
  }
}
