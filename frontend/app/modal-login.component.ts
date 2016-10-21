 // import {Component} from '@angular/core';


//
// @Component({
//     moduleId: module.id,
//     selector: 'login',
//     styleUrls: ['modal-login.component.css'],
//     templateUrl: './modal-login.component.html'
// })
// export class ModalLoginComponent {
// }

import { Component, EventEmitter, Input, Output} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './user.service';

@Component({
    selector: 'login',
    moduleId: module.id,
    styleUrls: ['modal-login.component.css'],
    template: `
    <div class="loginmodal-container">
              <h1>Login to Your Account</h1><br>
              <div class="input-group" >
                  <input type="text" name="user" placeholder="Username" #username>
                  <input type="submit" name="login" class="login loginmodal-submit" value="Login" (click)="loggedIn(username.value)">
              </div>
    </div>
    `
})
export class NgbdModalBasic {
    @Output() loginSuccess = new EventEmitter<boolean>();
    closeResult: string;

    constructor(private modalService: NgbModal, private userservice:UserService) {}

    loggedIn(username: string){
      console.log('loggedIn',username);
      this.userservice.reg(username, (username: string) => {
        console.log('loggedIn-callback',username)
        this.loginSuccess.emit(true);
      });
    };


}
