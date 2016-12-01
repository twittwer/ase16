import { Component } from '@angular/core';
import { UserService } from './user.service';
import { VoteService } from './vote.service';

@Component( {
  selector   : 'ase-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.scss' ]
} )
export class AppComponent {
  public title: string = 'ase16';

  constructor ( public userService: UserService, public voteService: VoteService ) {
  }
}
