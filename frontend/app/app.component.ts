import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <header *ngIf="isLoggedIn" (logout)="logout($event)"></header>
  <div *ngIf="isLoggedIn">
    <div [ngClass]="{'onLeftSide': isShowVoting}">
      <messagebox (displayVoting)="displayVoting($event)" class="messagebox-container"></messagebox>
    </div>
    <voting class="voting-container" *ngIf="isShowVoting"></voting>
  </div>
  <login  *ngIf="!isLoggedIn" (loginSuccess)="loginSuccess($event)"></login>
  `

})
export class AppComponent {
  public isShowVoting:boolean;
  public isLoggedIn:boolean;


  loginSuccess(login:boolean){
    if(login == true){
      this.isLoggedIn = true;
    }
  }
  logout(successLogout:boolean){
    if(successLogout == true){
      this.isLoggedIn = false;
    }
  }
  displayVoting(showVot:boolean){
    if(showVot == true){
      this.isShowVoting= true;
    }else{
      this.isShowVoting= false;
    }
  }
}
