import { Component, EventEmitter, Output } from '@angular/core';
import { VoteService } from '../vote.service';

@Component( {
  selector   : 'add-option',
  templateUrl: './add-option.component.html',
  styleUrls  : [ './add-option.component.scss' ]
} )
export class AddOptionComponent {
  @Output() closeAddOptionForm = new EventEmitter<boolean>();
  public optionsArray: any = [];

  constructor ( private voteService: VoteService ) {
  };

  addOption () {

    this.closeAddOptionForm.emit( false );
    let options: any = this.voteService.getCurrentVote().options;
    this.optionsArray.forEach( ( option: string ) => {
      options.push( { title: option } );
    } );

    console.log( 'call updateOptions', options );
    this.voteService.updateOptions( options, ( success: any ) => {
      console.log( 'updateOptions success? ', success );
    } );
  };

  closeAddUserOption () {
    this.closeAddOptionForm.emit( false );
  }

  getOptions ( options: Array<any> ) {
    this.optionsArray = options;
  }
}
