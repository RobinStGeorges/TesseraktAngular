import { CoursDataService } from '../service/cours/cours-data.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-exercices',
  templateUrl: './show-exercices.component.html',
  styleUrls: ['./show-exercices.component.css']
})
export class ShowExercicesComponent implements OnInit {

  idExercice: number;
  items: Array<any>;

  constructor(
    private cds: CoursDataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.idExercice = Number(this.route.snapshot.queryParamMap.get('id'));
    this.getData();
  }

  getData(){
    this.cds.getOneExercice(this.idExercice)
      .subscribe(result => {
        this.items = result;
      });
  }

}
