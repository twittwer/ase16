/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { VoteReportComponent } from './vote-report.component';
import { ResultChartComponent } from '../result-chart/result-chart.component';

describe( 'Component: VoteReport', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [],
      declarations: [
        VoteReportComponent,
        ResultChartComponent
      ]
    } );

    it( 'should create an instance', () => {
      let component = new VoteReportComponent();
      expect( component )
        .toBeTruthy();
    } );
  } );
} );
