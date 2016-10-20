import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <header></header>
  <div>
    <div [ngClass]="{'onLeftSide': isShowVoting}">
      <messagebox (displayVoting)="displayVoting($event)" class="messagebox-container"></messagebox>
    </div>
    <voting class="voting-container" *ngIf="isShowVoting"></voting>
  </div>
  <login></login>
  `

})
export class AppComponent {
  public isShowVoting:boolean;

  displayVoting(showVot:boolean){
    console.log(showVot);
    if(showVot == true){
      this.isShowVoting= true;
    }else{
      this.isShowVoting= false;
    }
  }
}
