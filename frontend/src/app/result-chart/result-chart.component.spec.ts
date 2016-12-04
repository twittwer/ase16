/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ResultChartComponent } from './result-chart.component';
import { VoteService } from '../vote.service';
import { UserService } from '../user.service';
import { ChartComponent } from 'angular2-highcharts';

describe( 'Component: ResultChart', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        VoteService,
        UserService
      ],
      declarations: [
        ResultChartComponent,
        ChartComponent
      ]
    } );

    this.fixture = TestBed.createComponent( ResultChartComponent );
  } );

  it( 'should create an instance', async( () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } ) );
} );
