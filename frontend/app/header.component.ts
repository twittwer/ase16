import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from "./user.service";

@Component({
  selector: 'header',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Chat</a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><p class="navbar-text">Signed in as <span class="navbar-link" [innerHTML]="userService.getUsername() || 'Anonymous'"></span></p></li>
          <li><button type="button" class="btn btn-default navbar-btn" (click)="userLogout()">Sign out</button></li>
        </ul>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  @Output() logout = new EventEmitter<boolean>();

  constructor(private userService: UserService) {
  }

  userLogout() {
    this.logout.emit(true);
  };
}
