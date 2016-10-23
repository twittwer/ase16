import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Vote, Option, Decision, Opinion, VoteService } from "./vote.service";
import { UserService } from "./user.service";
import myGlobals = require('./globals');

@Component({
  moduleId: module.id,
  selector: 'vote',
  templateUrl: 'vote.component.html'
})
export class VoteComponent implements OnChanges {
  @Input() private vote: Vote;
  private decisions: DecisionMap = {};

  constructor(private userService: UserService,
              private voteService: VoteService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.vote.options.forEach((option: Option) => {
      if (!option.opinions) {
        this.decisions[ option.title ] = null;
      } else {
        if (!option.opinions.some((opinion: Opinion) => {
            if (opinion.decider === this.userService.getUsername()) {
              this.decisions[ option.title ] = opinion.decision;
              return true;
            }
            return false;
          })) {
          this.decisions[ option.title ] = null;
        }
      }
    });
  }

  private alreadyVoted(): boolean {
    let completelyVoted: boolean = Boolean(this.vote.options.length);
    this.vote.options.forEach((option: Option) => {
      completelyVoted = completelyVoted
        && option.opinions
        && option.opinions.some((opinion: Opinion) => (opinion.decider === this.userService.getUsername()));
    });
    return completelyVoted;
  }

  private sendDecisions(): void {
    console.log('sendDecisions', this.decisions);

    let decisionsToSend: Decision[] = [];
    for (let option_title in this.decisions) {
      if (!this.decisions.hasOwnProperty(option_title))
        continue;
      if (this.decisions[ option_title ] === null)
        this.decisions[ option_title ] = false;
      decisionsToSend.push({
        option_title: option_title,
        decision: this.decisions[ option_title ]
      });
    }

    console.log('decisionsToSend', decisionsToSend, 'to', this.vote);
    this.voteService.sendOpinion(decisionsToSend, (success: boolean) => {
      if (!success) {
        console.log('sendOpinion failed');
        alert('Sorry, sending your opinion has failed.\nPlease try again.')
      } else {
        console.log('sendOpinion succeeds');
      }
    }, this.vote._id);
  }

  private onCheckBoxChange(option_title: string, event: any) {
    this.decisions[ option_title ] = event.target.checked;
  }

  closeChart() {
    myGlobals.chartCounter = 0;
  }
}

// TODO-?: is it possible to rename key
interface DecisionMap {
  [key: string]: boolean|null;
}