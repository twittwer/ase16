
 import { Component } from '@angular/core';
 import {VoteService} from './vote.service';
 import myGlobals = require('./globals');

 @Component({
    selector: 'simple-chart-example',
    template: `
        <chart [options]="options"></chart>
        
        
    `
})
//export var chartCounter: number = 0;

 // const chartCounter = 0;
export class ChartApp {

   // public chartCounter:number = 0;

//, [i]="i"

    constructor(private voteservice:VoteService) {


//, private i:number

     var currentOptions = voteservice.getOptions();


        console.log("------------------------------------------");
        console.log(currentOptions);

        console.log("chartcounter" + myGlobals.chartCounter);

      //  for (var i=0; i<= currentOption.length; i++) {
       /* if (counter == 0){
           // var counter = 0;
            // console.log("wurde gleich null gesetze" + counter);
        }
*/
       // console.log("counter davor:" + counter);

        console.log(currentOptions.length);

            this.options = {
                title : { text : currentOptions[myGlobals.chartCounter].title },

                chart: { type: 'pie', width: 200, height:200 },
                series: [{
                    name: 'Votes',
                    //colorByPoint: true,
                    data: [{
                        name: 'Yes',
                        y: currentOptions[myGlobals.chartCounter].yes_votes
                    }, {
                        name: 'No',
                        y: currentOptions[myGlobals.chartCounter].no_votes
                    }]
                }]
            };

        myGlobals.chartCounter = myGlobals.chartCounter +1;
        console.log("chartcounter nach inkrement" + myGlobals.chartCounter);
    }


  //  }
    options: HighchartsOptions;

}

