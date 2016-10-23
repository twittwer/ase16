import { Component, EventEmitter, Input, Output } from '@angular/core';
import {VoteService} from './vote.service';

@Component({
    selector: 'history',
    template: `
<div style="overflow:scroll"  class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <!--  <button type="button" class="close" data-dismiss="modal" (click)="closeCreateVotingForm()">&times;</button> -->
                <h4 class="modal-title">Voting History</h4>
            </div>
            
            <div class="modal-body">
            
           <div *ngFor="let oldVote of oldVotes"> 
          
                           <h2 class="divider">{{oldVote.title}}</h2>
                           
                         
                        <div *ngFor="let oldOption of oldVote.options">
                        
                               <h3>Voting Options: {{oldOption.title}}</h3>
                               <h4>Yes Votes: {{oldOption.yes_votes}}</h4>
                               <h4>No Votes: {{oldOption.no_votes}}</h4>
                      
                        </div>
                            
                     
           
              </div>
              
            </div>
            <div class="modal-footer">
                
                <button type="button" class="btn btn-default" (click)="closeHistoryForm()">Close</button>
            </div>
        </div>
    </div>
    
  `
})


export class HistoryFormComponent {
    @Output() closeHistoryForm = new EventEmitter<boolean>();


    constructor(private voteservice:VoteService){};

    public oldVotes = this.voteservice.getHistoricVotes();




    closeHistoryForm(){
        this.closeHistoryForm.emit(false);
    }


}
