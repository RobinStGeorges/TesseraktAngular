import {Component, OnDestroy, OnInit} from '@angular/core';
import { AngularFireDatabase,  } from 'angularfire2/database';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import DataSnapshot = firebase.database.DataSnapshot;
import { CoursDataService } from '../service/cours/cours-data.service';
import { Cours } from '../service/cours/cours-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../service/data/data.service';
import {HttpHeaders} from '@angular/common/http';

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'c31z' })
};


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})

export class CoursComponent implements OnInit{

  items: Array<any>;
  tousLesCours: any[];
  stringContenu: string;

  constructor(
    private coursService: CoursDataService,
    private router: Router,
    private dataService: DataService
  ) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.coursService.getAllCours()
      .subscribe(result => {
        this.items = result;
      });
  }



  showOneCours(numero: number) {
    this.router.navigate(['/showCours'], {queryParams: {id: numero}});
  }
}
