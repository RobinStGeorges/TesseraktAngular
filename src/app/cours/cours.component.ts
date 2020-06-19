import {Component, OnDestroy, OnInit} from '@angular/core';
import { AngularFireDatabase,  } from 'angularfire2/database';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import DataSnapshot = firebase.database.DataSnapshot;
import { CoursDataService } from '../service/cours/cours-data.service';
import { Cours } from '../service/cours/cours-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit{

  items: Array<any>;

  constructor(
    private coursService: CoursDataService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getData();
    console.log(this.items);
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
