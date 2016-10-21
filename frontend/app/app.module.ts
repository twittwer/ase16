import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import { MessageBoxComponent }  from './messagebox.component';
import { NgbdModalBasic } from './modal-login.component';
import { UserService } from "./user.service";
import {VotingFormComponent} from "./voting-Form.component";
import {VotingComponent} from "./voting.component";

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  declarations: [
    NgbdModalBasic,
    AppComponent,
    HeaderComponent,
    MessageBoxComponent,
    VotingFormComponent,
    VotingComponent
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
