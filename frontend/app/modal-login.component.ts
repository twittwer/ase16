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
              <form onsubmit="loggedIn()">
                  <input type="text" name="user" placeholder="Username" #username>
                  <input type="submit" name="login" class="login loginmodal-submit" value="Login" (click)="loggedIn(username.value)">
              </form>
    </div>
    `
})
export class NgbdModalBasic {
    constructor(private modalService: NgbModal, private userservice:UserService) {}
    @Output() loginSuccess = new EventEmitter<boolean>();
    closeResult: string;

    loggedIn(username: string){
      this.userservice.reg(username, ()=>{
        this.loginSuccess.emit(true);
      });
    };


}
