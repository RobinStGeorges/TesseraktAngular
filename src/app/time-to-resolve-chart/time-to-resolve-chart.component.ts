import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {environment} from '../../environments/environment';
import {take, toArray} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-to-resolve-chart.component.html',
  styleUrls: ['./time-to-resolve-chart.component.css']
})
export class TimeToResolveChartComponent implements OnInit {

  timeToSolve = [];
  dataId = [];

  public lineChartData: ChartDataSets[] = [
    { data: [14, 6], label: 'heures' },
  ];
  public lineChartLabels: Label[] = [ '1', '2' ];
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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getTimeToSolve();
    this.arrayOne();
    // this.lineChartData[0].data = this.timeToSolve;
    // this.lineChartLabels = this.dataId;
  }

  getTimeToSolve(){
    const emailModified = JSON.parse(localStorage.getItem('user')).login.
    replace('@', '%40').replace('.', '%point');
    this.http.get(environment.baseUrl + '/getTimeToSolve/' + emailModified )
      .pipe(take(1))
      .subscribe((response: any[]) => {
        // tslint:disable-next-line:only-arrow-functions
        const result = Object.keys(response).map(function(e){
          // tslint:disable-next-line:only-arrow-functions
          Object.keys(response[e]).forEach(function(k){
            if (typeof response[e][k] === 'object') {
              // tslint:disable-next-line:only-arrow-functions
              response[e][k] = Object.keys(response[e][k]).map(function(l){
                return response[e][k][l];
              });
            }
          });
          return response[e];
        });
        this.timeToSolve = result;
      });
  }

  // RETOURNE UN ARRAY AVEC N VALEURS
  arrayOne(){
    this.dataId = Array(this.timeToSolve.length);
  }

}
