import { Component } from '@angular/core';
import { UserService } from "./user.service";


@Component({
  selector: 'my-app',
  template: `
    <header *ngIf="userService.isLoggedIn()"></header>
    <div *ngIf="userService.isLoggedIn()">
      <div [ngClass]="{'onLeftSide': isShowVoting}">
        <messagebox (displayVoting)="showVotingPanel($event)" class="messagebox-container"></messagebox>
      </div>
      <voting class="voting-container" *ngIf="isShowVoting"></voting>
    </div>
    <login-modal></login-modal>
  `

})
export class AppComponent {
  private isShowVoting: boolean;

  constructor(private userService: UserService) {
  }

  showVotingPanel(showVotingPanel: boolean) {
    if (showVotingPanel) {
      this.isShowVoting = true;
    } else {
      this.isShowVoting = false;
    }
  }
}
