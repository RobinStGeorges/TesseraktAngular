import { Component, OnInit } from '@angular/core';
import { CoursDataService } from '../service/cours/cours-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {take} from 'rxjs/operators';
import {DataService} from '../service/data/data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-show-cours',
  templateUrl: './show-cours.component.html',
  styleUrls: ['./show-cours.component.css']
})
export class ShowCoursComponent implements OnInit {

  constructor(
    private cds: CoursDataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router
  ) {

  }


  cours: any;
  idCours: number;
  item: any;
  items: Array<any>;
  videoUrl: string;
  displayURL: SafeResourceUrl;

  ngOnInit(): void {
    this.idCours = Number(this.route.snapshot.queryParamMap.get('id'));
    // this.getData(this.idCours);
    this.http.get('http://localhost:3000/cours/' + this.idCours)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.item = response;
      });
  }

  showExerciceById(numero: number) {
    this.router.navigate(['/showExercice'], {queryParams: {id: numero}});
  }

}
