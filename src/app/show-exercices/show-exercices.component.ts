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
    // get exercice dat aby ID
    this.showExercice = true;
    this.idExercice = Number(this.route.snapshot.queryParamMap.get('id'));
    // this.getData(this.idCours);
    this.http.get('http://localhost:3000/exercices/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.item = response;
      });

    const emailModified = JSON.parse(localStorage.getItem('user')).login.
      replace('@', '%40').replace('.', '%point');
    // regarder si resultat dans userdata pour exo id
    this.http.get('http://localhost:3000/user/userdata/' +
      emailModified +
      '/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        console.log(response);
        // si pas de resultat, creer une entrée
        if (!response[0]){
          this.http.get('http://localhost:3000/exercices/createuserdatarow/' + this.idExercice + '/' + emailModified)
            .pipe(take(1))
            .subscribe((response2: any[]) => {
              console.log('entrée bien créée');
            });
        }
        // si resultat:
        // : is finished = true => disable btn + btn exo suivant

        // si non : set is started true et dates tart now
        if (!response[0].is_started){
          // set is started to true
          // et date start to now
          this.http.get('http://localhost:3000/exercices/setIsStarted/' + this.idExercice + '/' + emailModified)
            .pipe(take(1))
            .subscribe((response2: any[]) => {
              console.log('entrée bien mise à jour');
            });

        }
      });


  }

  setIsStartedByIdExoAndEmail(idExo, email ){

  }

  changeImg(path: string) {
    this.imgUrl = 'assets/' + path;
    // tslint:disable-next-line:triple-equals
    this.showExercice = !this.showExercice;
  }
}
