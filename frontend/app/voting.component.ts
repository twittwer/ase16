import { Component } from '@angular/core';

@Component({
  selector: 'voting',
  template: `
    <div *ngFor="let voting of votingOptions">
        <label class="checkbox-inline">
          <input type="checkbox" id={{voting.id}} value={{voting.description}}>{{voting.description}}
        </label>
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
