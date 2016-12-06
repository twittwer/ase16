import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { AppComponent } from './app.component';
import { VoteComponent } from './vote/vote.component';
import { VoteFormComponent } from './vote-form/vote-form.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { AddOptionComponent } from './add-option/add-option.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { UserService } from './user.service';
import { VoteService } from './vote.service';
import { ResultChartComponent } from './result-chart/result-chart.component';
import { HistoryComponent } from './history/history.component';
import { AseMainComponent } from './ase-main/ase-main.component';

@NgModule( {
  declarations: [
    AppComponent,
    VoteComponent,
    VoteFormComponent,
    MessageBoxComponent,
    AddOptionComponent,
    HeaderComponent,
    LoginModalComponent,
    QuestionListComponent,
    ResultChartComponent,
    HistoryComponent,
    AseMainComponent
  ],
  imports     : [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ChartModule
  ],
  providers   : [
    UserService,
    VoteService
  ],
  bootstrap   : [ AppComponent ]
} )
export class AppModule {
}
