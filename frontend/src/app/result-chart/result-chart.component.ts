import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote.service';
import { Option } from '../interfaces/vote';
// import myGlobals = require('../globals');
import * as myGlobals from '../globals';

@Component( {
  selector   : 'result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls  : [ './result-chart.component.scss' ]
} )
export class ResultChartComponent implements OnInit {

  public currentOptions: Option[];
  public options: any;

  constructor ( private voteService: VoteService ) {
  }

  public ngOnInit (): void {
    this.currentOptions = this.voteService.getOptions();

    this.options = {
      title : {
        text: this.currentOptions[ myGlobals.chartCounter ].title
      },
      chart : {
        type  : 'pie',
        width : 200,
        height: 200
      },
      series: [
        {
          name: 'Votes', // colorByPoint: true,
          data: [
            {
              name: 'Yes',
              y   : this.currentOptions[ myGlobals.chartCounter ].yes_votes
            },
            {
              name: 'No',
              y   : this.currentOptions[ myGlobals.chartCounter ].no_votes
            }
          ]
        }
      ]
    };

    // myGlobals.chartCounter = myGlobals.chartCounter + 1;
    myGlobals.setChartCounter( myGlobals.chartCounter + 1 );
  }
}
