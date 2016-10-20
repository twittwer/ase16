import { Component } from '@angular/core';

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
                    <votingForm (closeVotingForm)="closeVotingForm($event)" class="modal fade show in danger" id="myModal" role="dialog" *ngIf="showCreateVotingForm"></votingForm>
                </span>
            </div>
            <div class="voting-buttons">
                  <button class="btn btn-default" type="button" (click)="createNewVoting()">Start Voting</button>
                  <button class="btn btn-default" type="button" (click)="createNewVoting()">Change Voting</button>
                  <button class="btn btn-default" type="button">Cancel Voting</button>
            </div>
        </div>
    </div>
  `
})
export class MessageBoxComponent {
  public showCreateVotingForm: boolean;

  createNewVoting(){
    this.showCreateVotingForm = true;
  }
  closeVotingForm(show:boolean){
    if(show == false){
      this.showCreateVotingForm = false;
    }
  }
}
