/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { VoteService } from '../vote.service';
import { HistoryComponent } from './history.component';
import { UserService } from '../user.service';
import { VoteReportComponent } from '../vote-report/vote-report.component';
import { ResultChartComponent } from '../result-chart/result-chart.component';
import { ChartComponent } from 'angular2-highcharts';

describe( 'Component: History', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        VoteService,
        UserService
      ],
      declarations: [ HistoryComponent,
        VoteReportComponent,
        ResultChartComponent,
        ChartComponent ]
    } );

    this.fixture = TestBed.createComponent( HistoryComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
