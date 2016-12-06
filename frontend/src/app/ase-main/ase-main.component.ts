import {Component, OnInit} from '@angular/core';
import {VoteService} from '../vote.service';

@Component({
  selector: 'ase-main',
  templateUrl: './ase-main.component.html',
  styleUrls: ['./ase-main.component.scss']
})
export class AseMainComponent implements OnInit {

  constructor(private voteService: VoteService) {
  }

  ngOnInit() {
  }

}
