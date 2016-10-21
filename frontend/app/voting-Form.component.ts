import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'votingForm',
    template: `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" (click)="closeCreateVotingForm()">&times;</button>
                <h4 class="modal-title">Create New Voting</h4>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <div class="input-group">
                        <div class="input-group">
                            <span class="input-group-addon" id="sizing-addon2">Question</span>
                            <input type="text" class="form-control" placeholder="Your Question here" aria-describedby="sizing-addon2">
                        </div>
                        <div class="input-group voting-option">
                            <span class="input-group-addon" id="sizing-addon2">Expiration Date</span>
                            <input type="date" class="form-control" placeholder="Date" aria-describedby="sizing-addon2">
                        </div>
                    </div>
                    <div class="voting-answers">
                        <h3>Anwers</h3>
                        <question-list></question-list>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" (click)="startVoting()">Finish</button>
                <button type="button" class="btn btn-default" (click)="closeCreateVotingForm()">Close</button>
            </div>
        </div>
    </div>
  `
})
export class VotingFormComponent {
    @Output() closeVotingForm = new EventEmitter<boolean>();
    @Output() showVoting = new EventEmitter<boolean>();

    startVoting(){
      this.showVoting.emit(true);
    };
    closeCreateVotingForm(){
        this.closeVotingForm.emit(false);
    }



}
