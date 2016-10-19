import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'votingForm',
  template: `
  <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" (click)="closeCreateVotingForm()">&times;</button>
                <h4 class="modal-title">Create new Voting</h4>
            </div>
            <div class="modal-body">
              <form>
              <div class="form-group">
  <label for="exampleInputPassword1">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
</div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" (click)="closeCreateVotingForm()">Close</button>
            </div>
        </div>
    </div>
  `
})
export class VotingFormComponent {
  @Output() closeVotingForm = new EventEmitter<boolean>();
 closeCreateVotingForm(){
   this.closeVotingForm.emit(false);
 }
}
