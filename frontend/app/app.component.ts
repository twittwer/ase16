import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <header (showVoting)="showVoting($event)" ></header>
  <div>
    <div [ngClass]="{'onLeftSide': isShowVoting}">
      <messagebox class="messagebox-container"></messagebox>
    </div>
    <voting class="voting-container" *ngIf="isShowVoting"></voting>
  </div>
  <login></login>
  `

})
export class AppComponent {
  public isShowVoting:boolean;

  showVoting(showVot:boolean){
    console.log(showVot);
    if(showVot == true){
      this.isShowVoting= true;
    }else{
      this.isShowVoting= false;
    }
  }
}
