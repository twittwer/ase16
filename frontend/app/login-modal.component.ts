import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'login-modal',
  styleUrls: [ 'login-modal.component.css' ],
  templateUrl: 'login-modal.component.html'
})
export class LoginModalComponent {

  constructor(private userService: UserService) {
  }

  private logIn(username: string) {
    this.userService.reg(username, (success: boolean) => {
      if (!success)
        alert('Your Login failed!\nPlease try again.');
    });
  };
}
