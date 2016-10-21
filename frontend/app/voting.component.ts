import { Component } from '@angular/core';

@Component({
  selector: 'voting',
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <div *ngFor="let voting of votingOptions" class="input-group input-group-lg">
            <label class="checkbox-inline">
              <input type="checkbox" id={{voting.id}} value={{voting.description}}>{{voting.description}}
            </label>
        </div>
        <button class="btn btn-default" type="button">Vote</button>
      </div>
    </div>
  `})
export class VotingComponent {
  private votingOptions =[
    {id:1, description: 'Monday'},
    {id:2, description: 'Tuesday'},
    {id:3, description: 'Friday'},
    {id:4, description: 'Sunday'},
  ]
}
