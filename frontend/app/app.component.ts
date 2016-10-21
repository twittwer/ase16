import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';



@Component({
  selector: 'my-app',
  template: `
  <header *ngIf="isCookieSet()" (logout)="logout($event)"></header>
  <div *ngIf="isCookieSet()">
    <div [ngClass]="{'onLeftSide': isShowVoting}">
      <messagebox (displayVoting)="displayVoting($event)" class="messagebox-container"></messagebox>
    </div>
    <voting class="voting-container" *ngIf="isShowVoting"></voting>
  </div>
  <login  *ngIf="!isCookieSet()" (loginSuccess)="loginSuccess($event)"></login>
  `

})
export class AppComponent {

  public isShowVoting:boolean;
  public isLoggedIn:boolean;

  isCookieSet(){
    if(Cookie.get('userCookie')){
      return true;
    }
  }

  loginSuccess(login:boolean){
    Cookie.set('userCookie', 'test2');
    if(login == true){
      let myCookie = Cookie.get('userCookie');
      this.isLoggedIn = true;
    }
  }
  logout(successLogout:boolean){
    if(successLogout == true){
      Cookie.delete('userCookie');
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
