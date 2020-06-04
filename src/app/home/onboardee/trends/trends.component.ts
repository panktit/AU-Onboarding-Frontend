import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { TrendsService } from 'src/app/services/trends.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  constructor(private trendsService: TrendsService) { }

  // BAR CHART FOR LOCATION
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Onboardees',

        },
        ticks: {
          beginAtZero: true,
          stepSize: 1
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


  // PIE CHART FOR DEMANDED SKILLS
  dmdChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return ''+data.labels[tooltipItems.index]+' '+data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };

  dmdChartLabels: Label[];
  dmdChartData: number[];
  dmdChartType: ChartType = 'pie';
  dmdChartLegend = true;

// PIE CHART FOR SKILLS OF SELECTED ONBOARDEES
slChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'right',
  },
  tooltips: {
    enabled: true,
    mode: 'single',
  },
};

slChartLabels: Label[];
slChartData: number[];
slChartType: ChartType = 'pie';
slChartLegend = true;
  
  ngOnInit(): void {
    this.trendsService.getJoiningCitiesData().subscribe(data => {
      this.setBarGraphValues(data);
    })

    this.trendsService.getDmdSkillData().subscribe(data => {
      console.log("Skill Data: ", Object.keys(data));
      this.setDmdChartValues(data);
    })

    this.trendsService.getSelectedSkillData().subscribe(data => {
      console.log("Skill Data: ", Object.keys(data));
      this.setSelectedChartValues(data);
    })
  }

  setBarGraphValues(data) {
    for (const i in data) {
      this.barChartLabels.push(data[i][1]);
      this.barChartData[0].data.push(data[i][0]);
    }
  }

  setDmdChartValues(data) {
    this.dmdChartLabels = Object.keys(data);
    this.dmdChartData = Object.values(data);
  }

  setSelectedChartValues(data) {
    this.slChartLabels = Object.keys(data);
    this.slChartData = Object.values(data);
  }
}
