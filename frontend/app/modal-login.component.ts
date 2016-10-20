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
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'login',
    moduleId: module.id,
    styleUrls: ['modal-login.component.css'],
    template: `
    <div class="loginmodal-container">
              <h1>Login to Your Account</h1><br>
              <form onsubmit="loggedIn()">
                  <input type="text" name="user" placeholder="Username">
                <input type="submit" name="login" class="login loginmodal-submit" value="Login" (click)="loggedIn()">
              </form>
              <button class="btn btn-default" type="button" (click)="loggedIn()">Login</button>

              <div class="login-help">
                  <a href="#">Register</a> - <a href="#">Forgot Password</a>
              </div>
    </div>
    `
})
export class NgbdModalBasic {
    @Output() loginSuccess = new EventEmitter<boolean>();

    closeResult: string;

    loggedIn(){
      CookieService.put("loggedIn",true);
      this.loginSuccess.emit(true);
    };

    constructor(private modalService: NgbModal) {}
}
