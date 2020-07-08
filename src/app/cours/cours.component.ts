import {Component, OnDestroy, OnInit} from '@angular/core';
import { CoursDataService } from '../service/cours/cours-data.service';
import { Cours } from '../service/cours/cours-data.service';
import { Router } from '@angular/router';
import { DataService } from '../service/data/data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})

export class CoursComponent implements OnInit{
  lesCours = [];


  constructor(
    private coursService: CoursDataService,
    private router: Router,
    private dataService: DataService,
    private http: HttpClient
  ) {

  }
  ngOnInit(): void {
    this.getAllCours();
  }

  getAllCours(){
    this.http.get('http://localhost:3000/cours/')
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.lesCours = response;
      });
  }



  showOneCours(numero: number) {
    this.router.navigate(['/showCours'], {queryParams: {id: numero}});
  }
}
