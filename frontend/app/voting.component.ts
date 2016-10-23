import { Component } from '@angular/core';
import { VoteService } from './vote.service';


@Component({
  selector: 'voting',
  template: `
  <div>
    <div *ngIf="canVote()" class="panel panel-default">
      <div class="panel-body" >
        <div *ngFor="let option of voteOptions">
            <label >
              <input type="checkbox"  value="{{option.title}}" name="options" [checked]="voteOptions.indexOf(option.title) >= 0" (change)="updateCheckedOption(option.title, $event)">{{option.title}}
            </label>
        </div>
        <button class="btn btn-default" type="button" (click)="sendVote()">Vote</button>
      </div>
    </div>
    <div *ngIf="!canVote()" class="panel panel-default">
      <div class="panel-body" >
        <h1>Thanks for your Vote</h1>
      </div>
    </div>
    </div>
  `
})
export class VotingComponent {
  public voteOptions = this.currentVote.options;
  public optionsChecked: any[] = [];
  private currentVote = this.voteService.getCurrentVote();
  private closedVote: any;
  private optionsMap: any[] = [];

  constructor(private voteService: VoteService) {
    console.log('VotingComponent: constructor');
    // this.initOptionsMap();
  };

  initOptionsMap();

  initOptionsMap() {
    console.log('VotingComponent: initOptionsMap');

    for (var x: any = 0; x < this.voteOptions.length; x++) {
      this.optionsMap.push([ this.voteOptions[ x ].title, true ]);
      // this.optionsMap[this.voteOptions[x].title] = true;
    }
  }

  canVote() {
    console.log('VotingComponent: canVote');

    let vote = this.voteService.getCurrentVote();
    if (this.closedVote == null) {
      console.log("can vote true");
      return true;
    } else {
      console.log("currentVote");
      if (vote._id == this.closedVote._id) {
        return false;
      } else {
        return true;
      }
    }
  }

  updateOptions() {
    console.log('VotingComponent: updateOptions');

    for (var x in this.optionsMap) {
      if (this.optionsMap[ x ]) {
        console.log("push?");
        this.optionsChecked.push(x);
      }
    }
    this.optionsChecked = [];
  }

  updateCheckedOption(option, event) {
    console.log('VotingComponent: updateCheckedOption');

    for (var x: any = 0; x < this.voteOptions.length; x++) {
      this.optionsMap[ this.voteOptions[ x ].title ] = true;
    }
    this.updateOptions();
  }


  sendVote() {
    console.log('VotingComponent: sendVote');

    this.closedVote = this.currentVote;
    this.voteService.sendOpinion(this.optionsMap, (success: any)=> {
      console.log('sendOpinionSuccess: ', success);
      // this.closedVote = this.currentVote;
    });

  }
}
