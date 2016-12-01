import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component( {
  selector   : 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls  : [ './login-modal.component.scss' ]
} )
export class LoginModalComponent {

  constructor ( private userService: UserService ) {
  }

  public logIn ( username: string ) {
    this.userService.login( username, ( success: boolean ) => {
      if ( !success ) {
        alert( 'Your Login failed!\nPlease try again.' );
      }
    } );
  };
}
