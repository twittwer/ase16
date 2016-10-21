import { Component, Input } from '@angular/core';
//import { BaseChartDirective } from 'ng2-charts';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
// webpack html imports
//let template = require('./vote-result.component.html');
//import Chart from '/src/chart.js'
//let myChart = new Chart({...})

@Component({
    selector: 'pie-demo',
    moduleId: module.id,
    templateUrl: './vote-result.component.html'

})
export class ChartOne {
    // Pie

  /*
   styleUrls: ['vote-results.component.css'],
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';

*/
    @Input() name: string;
    helloName: string;

    constructor() {
        this.name = "World";

    }

    /*
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];

    Base
     */
}


