import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import { MessageBoxComponent }  from './messagebox.component';
import { LoginModalComponent } from './login-modal.component';

import { UserService } from "./user.service";
import { VoteService } from "./vote.service";
import { VotingFormComponent }  from './voting-form.component';
import { HistoryFormComponent }  from './history-form.component';
import { QuestionListComponent }  from './question-list.component';
import { VoteComponent } from "./vote.component";


import { ChartModule } from 'angular2-highcharts';
import { ChartApp } from './chartapp.component';
import { AddOptionComponent } from "./add-option.component";


@NgModule({
  imports: [
    BrowserModule,
    ChartModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LoginModalComponent,
    HeaderComponent,
    MessageBoxComponent,
    AddOptionComponent,
    VotingFormComponent,
    QuestionListComponent,
    VoteComponent,
    ChartApp,
    HistoryFormComponent
  ],
  providers: [ UserService, VoteService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
