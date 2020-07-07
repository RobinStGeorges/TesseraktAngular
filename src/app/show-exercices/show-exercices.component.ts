import { CoursDataService } from '../service/cours/cours-data.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import { DataService } from '../service/data/data.service';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-show-exercices',
  templateUrl: './show-exercices.component.html',
  styleUrls: ['./show-exercices.component.css']
})
export class ShowExercicesComponent implements OnInit {

  idExercice: number;
  items: Array<any>;
  imgUrl: string;
  exercice: any;
  showExercice: boolean;
  item: any;

  constructor(
    private cds: CoursDataService,
    private ds: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.showExercice = true;
    this.idExercice = Number(this.route.snapshot.queryParamMap.get('id'));
    // this.getData(this.idCours);
    this.http.get('http://localhost:3000/exercices/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        console.log(response);
        this.item = response;
      });
  }

  changeImg(path: string) {
    this.imgUrl = 'assets/' + path;
    // tslint:disable-next-line:triple-equals
    this.showExercice = !this.showExercice;
  }
}
