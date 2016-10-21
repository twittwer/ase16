import { Component, EventEmitter, Input, Output } from '@angular/core';
import {VoteService} from './vote.service';

@Component({
  selector: 'messagebox',
  template: `
    <div class="messagebox-container">
        <div class="messagebox-showmessage">
        </div>
        <div class="messagebox-sendmessage">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Write your Message here">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button">Send</button>
                    <votingForm (showVoting)="showVoting($event)" (closeVotingForm)="closeVotingForm($event)" class="modal fade show in danger" id="myModal" role="dialog" *ngIf="showCreateVotingForm"></votingForm>
                </span>
            </div>
            <div class="voting-buttons">
                  <button class="btn btn-default" type="button" (click)="createNewVoting()">Start Voting</button>
                  <button class="btn btn-default" type="button" (click)="cancelVoting()">Cancel Voting</button>
            </div>
        </div>
    </div>
  `
})
export class MessageBoxComponent {
  @Output() displayVoting = new EventEmitter<boolean>();
  public showCreateVotingForm: boolean;

  constructor(private voteservice:VoteService){};

  createNewVoting(){
    this.showCreateVotingForm = true;
  }
  closeVotingForm(show:boolean){
    if(show == false){
      this.showCreateVotingForm = false;
    }
  }
  showVoting(isVoting:boolean){
    if(isVoting==true){
        this.showCreateVotingForm = false;
        this.displayVoting.emit(true);
    }
  }
  cancelVoting(){
    let currentDate = new Date();
    let currentVote = this.voteservice.getCurrentVote();
    currentVote.closed_at = currentDate;
    this.voteservice.sendVote(currentVote, ()=>{});
    this.displayVoting.emit(false);
  }
}
