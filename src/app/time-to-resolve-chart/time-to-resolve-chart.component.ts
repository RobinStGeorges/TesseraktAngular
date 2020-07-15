import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-to-resolve-chart.component.html',
  styleUrls: ['./time-to-resolve-chart.component.css']
})
export class TimeToResolveChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(245, 184, 46, 1)',
      backgroundColor: 'rgba(245, 184, 46, 1)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
