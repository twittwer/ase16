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


    @Input() name: string;
    helloName: string;

    constructor() {
        this.name = "World";


    }




