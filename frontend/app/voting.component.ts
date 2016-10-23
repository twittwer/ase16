import { Component, EventEmitter, Input, Output } from '@angular/core';
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
        <!-- IMPORTANT -->
        <addUserOption (closeAddOptionForm)="closeAddOptionForm($event)" class="modal fade show in danger" id="myModal" role="dialog" *ngIf="showAddUserOptionForm"></addUserOption>
        <button class="btn btn-default" type="button" (click)="sendVote()">Vote</button>
        <!-- IMPORTANT -->
        <button class="btn btn-default" type="button" (click)="addNewOption()">Add Option</button>
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
  constructor(private voteservice: VoteService) {
  };

  private currentVote = this.voteservice.getCurrentVote();
  private closedVote: any;
  public voteOptions = this.currentVote.options;
  private optionsMap: any[] = [];
  public optionsChecked: any[] = [];

  /* BEGIN - IMPORTANT */
  public showAddUserOptionForm: boolean;

  addNewOption() {
    this.showAddUserOptionForm = true;
  }

  closeAddOptionForm(show: boolean) {
    if (show == false) {
      this.showAddUserOptionForm = false;
    }
  }
  /* END - IMPORTANT */

  initOptionsMap();

  initOptionsMap() {
    for (var x: any = 0; x < this.voteOptions.length; x++) {
      this.optionsMap.push([ this.voteOptions[ x ].title, true ]);
      // this.optionsMap[this.voteOptions[x].title] = true;
    }
  }

  canVote() {
    let vote = this.voteservice.getCurrentVote();
    if (this.closedVote == null) {
      //console.log("can vote true");
      return true;
    } else {
      //sconsole.log("currentVote");
      if (vote._id == this.closedVote._id) {
        return false;
      } else {
        return true;
      }
    }
  }

  updateOptions() {
    for (var x in this.optionsMap) {
      if (this.optionsMap[ x ]) {
        console.log("push?");
        this.optionsChecked.push(x);
      }
    }
    this.optionsChecked = [];
  }

  updateCheckedOption(option, event) {
    for (var x: any = 0; x < this.voteOptions.length; x++) {
      this.optionsMap[ this.voteOptions[ x ].title ] = true;
    }
    this.updateOptions();
  }


  sendVote() {
    this.closedVote = this.currentVote;
    this.voteservice.sendOpinion(this.optionsMap, (success: any)=> {
      console.log(success);
      // this.closedVote = this.currentVote;
    });
  }
}
