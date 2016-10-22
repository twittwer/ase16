import { Component } from '@angular/core';
import {VoteService} from './vote.service';


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
  constructor(private voteservice:VoteService){};
  private currentVote = this.voteservice.getCurrentVote();
  private closedVote: any;
  public voteOptions = this.currentVote.options;
  private optionsMap: any[] =  [];
  public optionsChecked: any[] = [];
  initOptionsMap();

  initOptionsMap(){
    for (var x:any = 0; x<this.voteOptions.length; x++) {
      this.optionsMap.push([this.voteOptions[x].title, true]);
        // this.optionsMap[this.voteOptions[x].title] = true;
    }
  }

  canVote(){
    let vote = this.voteservice.getCurrentVote();
    console.log(this.closedVote);
      console.log("checkVote");
    if(this.closedVote == null){
      console.log("can vote true");
      return true;
    }else{
      console.log("currentVote");
      if(vote._id == this.closedVote._id){
        return false;
      }
    }
  }

  updateOptions() {
      for(var x in this.optionsMap) {
          if(this.optionsMap[x]) {
            console.log("push?");
              this.optionsChecked.push(x);
          }
      }
      this.optionsChecked = [];
  }

  updateCheckedOption(option, event) {
    for (var x:any = 0; x<this.voteOptions.length; x++) {
        this.optionsMap[this.voteOptions[x].title] = true;
    }
   this.updateOptions();
 }



  sendVote() {
    this.closedVote = this.currentVote;
    this.voteservice.sendOpinion(this.optionsMap, (success: any)=>{
      console.log(success);
      // this.closedVote = this.currentVote;
    });

  }
}
