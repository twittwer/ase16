import { Component } from '@angular/core';
import { UserService } from "./user.service";
import { VoteService } from "./vote.service";


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(private userService: UserService,
              private voteService: VoteService) {
  }
}
