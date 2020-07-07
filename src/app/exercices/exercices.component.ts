import { Component, OnInit } from '@angular/core';
import DataSnapshot = firebase.database.DataSnapshot;
import { ExerciceService } from '../service/exercice/exercice.service';
import {Cours, CoursDataService} from '../service/cours/cours-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {take} from 'rxjs/operators';
import {DataService} from '../service/data/data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  items: Array<any>;

  lesExercices = [];

  constructor(
    private exerciceService: ExerciceService,
    private router: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/exercices/')
      .pipe(take(1))
      .subscribe((response: any[]) => {
        console.log(response);
        this.lesExercices = response;
      });
  }

  getData(){
    this.exerciceService.getAllExercice()
      .subscribe(result => {
        this.items = result;
      });
  }


  showOneExercice(numero: number) {
    this.router.navigate(['/showExercice'], {queryParams: {id: numero}});
  }

}
