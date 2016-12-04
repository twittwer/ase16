import { Component, EventEmitter, Output } from '@angular/core';
import { VoteService, Option, Vote } from '../vote.service';

@Component( {
  selector   : 'vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls  : [ './vote-form.component.scss' ]
} )
export class VoteFormComponent {
  @Output() closeVotingForm = new EventEmitter<boolean>();
  @Output() showVoting = new EventEmitter<boolean>();
  public optionsArray: any = [];

  constructor ( private voteService: VoteService ) {
  };

  startVoting ( description, date ) {
    console.log( 'startVoting', arguments );

    let options: Option[] = [];
    this.optionsArray.forEach( ( option: string ) => {
      options.push( { title: option } );
    } );
    let newVote: Vote = {
      title    : description,
      room     : 'default',
      closed_at: new Date( date ),
      options  : options
    };

    console.log( 'newVote', newVote );
    this.voteService.sendVote( newVote, ( success: boolean ) => {
      console.log( 'sendVoteSuccess', success );
      if ( success ) {
        this.showVoting.emit( true );
      }
    } );
  };

  closeCreateVotingForm () {
    this.closeVotingForm.emit( false );
  }

  getOptions ( options: Array<any> ) {
    this.optionsArray = options;
  }

}
