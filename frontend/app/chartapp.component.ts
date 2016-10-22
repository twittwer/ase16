
 import { Component } from '@angular/core';

@Component({
    selector: 'simple-chart-example',
    template: `
        <chart [options]="options"></chart>
    `
})
export class ChartApp {
    constructor() {
        this.options = {
            title : { text : 'Voting results' },

            chart: { type: 'pie' },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Ja',
                    y: 56.33
                }, {
                    name: 'Nein',
                    y: 24.03
                }]
            }]
        };
    }
    options: HighchartsOptions;
}

