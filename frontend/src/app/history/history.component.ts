import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { Vote } from '../interfaces/vote';

@Component( {
  selector   : 'history',
  templateUrl: './history.component.html',
  styleUrls  : [ './history.component.scss' ]
} )
export class HistoryComponent implements OnInit {
  @Output() closeHistoryForm = new EventEmitter<boolean>();

  public oldVotes: Vote[];

  constructor ( private voteService: VoteService ) {
  }

  public ngOnInit (): void {
    this.oldVotes = this.voteService.getHistoricVotes();
  }

  onCloseHistoryForm () {
    this.closeHistoryForm.emit( false );
  }
}
