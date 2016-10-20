import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'header',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Chat</a>
          <li><button type="button" class="btn btn-default navbar-btn" (click)="showVot()">ShowVoting</button></li>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><p class="navbar-text">Signed in as <a href="#" class="navbar-link">Anonym</a></p></li>
          <li><button type="button" class="btn btn-default navbar-btn">Sign out</button></li>
        </ul>
      </div>
    </nav>
  `})
export class HeaderComponent {
  @Output() showVoting = new EventEmitter<boolean>();
  showVot(){
    this.showVoting.emit(true);
  }
}
