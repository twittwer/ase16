import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import { MessageBoxComponent }  from './messagebox.component';
import { NgbdModalBasic } from './modal-login.component';

import { UserService } from "./user.service";
import { VoteService } from "./vote.service";
import { VotingComponent } from './voting.component';
import { VotingFormComponent }  from './voting-Form.component';
import { QuestionListComponent }  from './question-list.component';
import { AddOptionComponent }  from './add-option.component';

import { Cookie } from 'ng2-cookies/ng2-cookies';

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
    NgbdModalBasic,
    VotingComponent,
    VotingFormComponent,
    QuestionListComponent,
    AddOptionComponent
  ],
  providers: [ UserService, VoteService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
