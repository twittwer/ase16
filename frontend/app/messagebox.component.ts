import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoteService } from './vote.service';
import { UserService } from "./user.service";

@Component({
  moduleId: module.id,
  selector: 'messagebox',
  templateUrl: 'messagebox.component.html'
})
export class MessageBoxComponent {
  @Output() displayHistory = new EventEmitter<boolean>();
  public showCreateVotingForm: boolean;
  public showHistoryForm: boolean;

  constructor(private voteService: VoteService,
              private userService: UserService) {
  };

  showOldVotes() {
    this.showHistoryForm = true;
  }

  showHist() {
    this.showHistoryForm = false;
    this.displayHistory.emit(true);
  }

  closeHistoryForm(show: boolean) {
    if (show == false) {
      this.showHistoryForm = false;
    }
  }

  createNewVoting() {
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

  canCancel(): boolean {
    return this.voteService.hasActiveVote()
      && (this.voteService.getCurrentVote().creator === this.userService.getUsername());
  }

  cancelVoting() {
    let currentDate = new Date();
    let currentVote = this.voteService.getCurrentVote();
    currentVote.closed_at = currentDate;
    this.voteService.sendVote(currentVote, (success: boolean)=> {
      if (!success) {
        console.log('updating sendVote failed', currentVote);
        alert('Sorry, Cancellation of Voting failed.\nPlease try again.');
      } else {
        console.log('updating sendVote succeeds');
      }
    });
  }
}
