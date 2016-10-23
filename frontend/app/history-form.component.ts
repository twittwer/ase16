import { Component, EventEmitter, Input, Output } from '@angular/core';
import {VoteService} from './vote.service';

@Component({
    selector: 'history',
    template: `
<div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" (click)="closeCreateVotingForm()">&times;</button>
                <h4 class="modal-title">Create New Voting</h4>
            </div>
            <div class="modal-body">
            
           <div *ngFor="let oldVote of oldVotes"> 
             
                <label >
                <!-- <p>{{oldVote.title}}</p> -->
                  
                  
                </label>
           
              </div>
              
            </div>
            <div class="modal-footer">
                
                <button type="button" class="btn btn-default" (click)="closeCreateVotingForm()">Close</button>
            </div>
        </div>
    </div>
    
  `
})


export class HistoryFormComponent {
    @Output() closeHistForm = new EventEmitter<boolean>();

    constructor(private voteservice:VoteService){};
    public oldVotes = this.voteservice.getHistoricVotes();




    closeCreateVotingForm(){
        this.closeHistForm.emit(false);
    }
}
