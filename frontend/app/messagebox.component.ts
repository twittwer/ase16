import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoteService } from './vote.service';

@Component({
  moduleId: module.id,
  selector: 'messagebox',
  templateUrl: 'messagebox.component.html'
})
export class MessageBoxComponent {
  @Output() displayHist = new EventEmitter<boolean>();
  public showCreateVotingForm: boolean;
  public showHistoryForm: boolean;

  constructor(private voteService: VoteService) {
  };

  /* HTML - Important */
  // next to start voting: <button class="btn btn-default" type="button" (click)="showOldVotes()">Vote History</button>
  // next to voting-form: <history (showHist)="showHist($event)"  class="modal fade show in danger" id="myModal" role="dialog" *ngIf="showHistoryForm"></history>

  /* BEGIN - Important */
  showOldVotes() {
    this.showHistoryForm = true;
  }

  showHist(){
    this.showHistoryForm = false;
    this.displayHist.emit(true);
  }
  /* END - Important */

  createNewVoting(){
    this.showCreateVotingForm = true;
  }

  closeVotingForm(show: boolean) {
    if (show == false) {
      this.showCreateVotingForm = false;
    }
  }

  showVoting(isVoting: boolean) {
    console.log('showVoting', arguments);

    if (isVoting == true) {
      this.showCreateVotingForm = false;
    }
  }

  cancelVoting(){
    let currentDate = new Date();
    let currentVote = this.voteService.getCurrentVote();
    currentVote.closed_at = currentDate;
    this.voteService.sendVote(currentVote, (success: boolean)=> {
      if(!success) {
        console.log('updating sendVote failed', currentVote);
        alert('Sorry, Cancellation of Voting failed.\nPlease try again.');
      } else {
        console.log('updating sendVote succeeds');
      }
    });
  }
}
