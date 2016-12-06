import { Component, OnInit, Input } from '@angular/core';
import { Vote, Option, Decision, Opinion, VoteService } from '../vote.service';

@Component({
  selector: 'vote-report',
  templateUrl: './vote-report.component.html',
  styleUrls: ['./vote-report.component.scss']
})
export class VoteReportComponent implements OnInit {

  @Input() public vote: Vote;

  constructor() { }

  ngOnInit() {
  }

}
