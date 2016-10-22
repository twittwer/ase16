import { Component } from '@angular/core';
import { UserService } from "./user.service";

@Component({
  moduleId: module.id,
  selector: 'header',
  styles: [ '.navbar { cursor: default; }' ],
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  constructor(private userService: UserService) {
  }
}
