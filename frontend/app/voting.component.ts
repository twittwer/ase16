import { Component } from '@angular/core';
import {VoteService} from './vote.service';

@Component({
  selector: 'voting',
  template: `
    <div class="panel panel-default">
      <div class="panel-body" #myPanel>
        <div *ngFor="let option of voteOptions" class="input-group input-group-lg">
            <label class="checkbox-inline">
              <input type="checkbox" id={{option.key}} value={{option.title}} >{{option.title}}
            </label>
        </div>
        <button class="btn btn-default" type="button" (click)="sendVote(myPanel)">Vote</button>
      </div>
    </div>
  `})
export class VotingComponent {
  constructor(private voteservice:VoteService){};
  private currentVote = this.voteservice.getCurrentVote();
  public voteOptions = this.currentVote.options;



  sendVote(parent: any) {
    console.log("test", parent);
    /*
    let elements = parent.children;
    for(let i = 0;i<element.length-2;i++) {
      elements[i]
    }
    */
  }
}
