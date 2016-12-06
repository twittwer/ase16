/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { UserService } from '../user.service';
import { VoteService } from '../vote.service';
import { VoteComponent } from './vote.component';
import { ResultChartComponent } from '../result-chart/result-chart.component';
import { AddOptionComponent } from '../add-option/add-option.component';
import { ChartComponent } from 'angular2-highcharts';
import { QuestionListComponent } from '../question-list/question-list.component';
import { VoteReportComponent } from '../vote-report/vote-report.component';

describe( 'Component: Vote', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        UserService,
        VoteService
      ],
      declarations: [
        VoteComponent,
        ResultChartComponent,
        AddOptionComponent,
        ChartComponent,
        QuestionListComponent,
        VoteReportComponent
      ]
    } );

    this.fixture = TestBed.createComponent( VoteComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
