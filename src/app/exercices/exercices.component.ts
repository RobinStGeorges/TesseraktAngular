import { Component, OnInit } from '@angular/core';
import { ExerciceService } from '../service/exercice/exercice.service';
import { Router } from '@angular/router';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {split} from "ts-node";

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  lesExercices = [];
  userMail: string;
  arrayuserFinished: string[];

  constructor(
    private exerciceService: ExerciceService,
    private router: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.getAllExercicesData();
    this.userMail = JSON.parse(localStorage.getItem('user')).login;
  }

  getAllExercicesData(){
    this.http.get(environment.baseUrl + '/exercices/')
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.lesExercices = response;
      });
  }


  showOneExercice(numero: number) {
    this.router.navigate(['/showExercice'], {queryParams: {id: numero}});
  }

  isInArray(array: string){
    const newVar = array.split(';');
    return newVar.indexOf(this.userMail) > -1;
  }

}
