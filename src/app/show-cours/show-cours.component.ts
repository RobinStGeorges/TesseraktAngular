import { Component, OnInit } from '@angular/core';
import { CoursDataService } from '../service/cours/cours-data.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-show-cours',
  templateUrl: './show-cours.component.html',
  styleUrls: ['./show-cours.component.css']
})
export class ShowCoursComponent implements OnInit {

  constructor(
    private cds: CoursDataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

  }
;

  cours: any;
  idCours: number;
  item: any;
  items: Array<any>;
  videoUrl: string;
  displayURL: SafeResourceUrl;

  ngOnInit(): void {
    this.idCours = Number(this.route.snapshot.queryParamMap.get('id'));
    this.getData(this.idCours);
  }

  getData(idCours: number){
    this.cds.getOneCours(idCours)
      .subscribe(result => {
        this.items = result;
      });
  }

  getCleanUrl(url: string){
    console.log(url);
    this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(url.trim());
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url + '&output=embed');
  }

}
