import { Component, OnInit } from '@angular/core';
import { CoursDataService } from '../service/cours/cours-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-cours',
  templateUrl: './show-cours.component.html',
  styleUrls: ['./show-cours.component.css']
})
export class ShowCoursComponent implements OnInit {

  cours: any;
  idCours: number;
  item: any;

  constructor(
    private cds: CoursDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.route.data.subscribe(routeData => {
    //   const data = routeData.data;
    //   if (data) {
    //     this.item = data.payload.data();
    //     this.idCours = data.payload.id;
    //   }
    // });
    this.idCours = Number(this.route.snapshot.queryParamMap.get('id'));
    console.log('tttttest');
    console.log(this.idCours);
    this.getData(this.idCours);
  }

  getData(idCours: number){
    this.cds.getOneCours(idCours)
      .subscribe(result => {
        this.cours = result;
      });
  }

}
