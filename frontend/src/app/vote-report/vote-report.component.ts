import { Component, Input } from '@angular/core';
import { Vote } from '../interfaces/vote';

@Component( {
  selector   : 'vote-report',
  templateUrl: './vote-report.component.html',
  styleUrls  : [ './vote-report.component.scss' ]
} )
export class VoteReportComponent {

  @Input() public vote: Vote;

  constructor () {
  }
}
