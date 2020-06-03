import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TrendsService } from 'src/app/services/trends.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  constructor(private trendsService: TrendsService) { }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Onboardees',

        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] =
    [{
      data: [],
      label: 'Onboardees Joined'
    }];

  ngOnInit(): void {
    this.trendsService.getJoiningCitiesData().subscribe(data => {
      console.log(data);
      this.setGraphValues(data);
    })
  }

  setGraphValues(data) {
    for (const i in data) {
      this.barChartLabels.push(data[i][1]);
      this.barChartData[0].data.push(data[i][0]);
    }
  }

}
