import { Component, OnInit } from '@angular/core';
import DataSnapshot = firebase.database.DataSnapshot;
import { ExerciceService } from '../service/exercice/exercice.service';
import {Cours, CoursDataService} from '../service/cours/cours-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  items: Array<any>;

  constructor(
    private exerciceService: ExerciceService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getData();
    console.log(this.items);
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
