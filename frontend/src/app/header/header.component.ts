import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component( {
  selector   : 'header',
  templateUrl: './header.component.html',
  styleUrls  : [ './header.component.scss' ]
} )
export class HeaderComponent {

  constructor ( private userService: UserService ) {
  }
}
