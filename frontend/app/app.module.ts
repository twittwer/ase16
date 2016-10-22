import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import { MessageBoxComponent }  from './messagebox.component';
import { LoginModalComponent } from './login-modal.component';

import { UserService } from "./user.service";
import { VoteService } from "./vote.service";
import { VotingComponent } from './voting.component';
import { VotingFormComponent }  from './voting-Form.component';
import { QuestionListComponent }  from './question-list.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginModalComponent,
    HeaderComponent,
    MessageBoxComponent,
    VotingComponent,
    VotingFormComponent,
    QuestionListComponent
  ],
  providers: [ UserService, VoteService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
