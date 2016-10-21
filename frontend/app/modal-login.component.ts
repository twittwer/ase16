import { Component, EventEmitter, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';

@Component({
  selector: 'login',
  moduleId: module.id,
  styleUrls: [ 'modal-login.component.css' ],
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

  constructor(private modalService: NgbModal, private userservice: UserService) {
  }

  loggedIn(username: string) {
    this.userservice.reg(username, (success: boolean) => {
      if (success)
        this.loginSuccess.emit(true);
    });
  };


}
