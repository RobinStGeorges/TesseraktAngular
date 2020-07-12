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
  imgUrl: string;
  exercice: any;
  showExercice: boolean;
  item: any;
  cubeNeeded: any;
  responseIsCorrect = -1;
  x = 0;
  y = 0;


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
        const object = JSON.parse(response[0].cube_needed);
        // tslint:disable-next-line:only-arrow-functions
        const result = Object.keys(object).map(function(e){
          // tslint:disable-next-line:only-arrow-functions
          Object.keys(object[e]).forEach(function(k){
            if (typeof object[e][k] === 'object') {
              // tslint:disable-next-line:only-arrow-functions
              object[e][k] = Object.keys(object[e][k]).map(function(l){
                return object[e][k][l];
              });
            }
          });
          return object[e];
        });
        this.cubeNeeded = result;
        // console.log(result);
      });

    const emailModified = JSON.parse(localStorage.getItem('user')).login.
      replace('@', '%40').replace('.', '%point');
    // regarder si resultat dans userdata pour exo id
    this.http.get('http://localhost:3000/user/userdata/' +
      emailModified +
      '/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
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

  changeImg(path: string) {
    this.imgUrl = 'assets/' + path;
    // tslint:disable-next-line:triple-equals
    this.showExercice = !this.showExercice;
  }

  checkWithCubes(){
    const emailModified = JSON.parse(localStorage.getItem('user')).login.
    replace('@', '%40').replace('.', '%point');
    this.http.get('http://localhost:3000/reponse/' +
      emailModified +
      '/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: number) => {
        // tslint:disable-next-line:triple-equals
        if (response == 1){
          alert('Vous avez trouvé la bonne solution grace aux cubes ! Félicitation ! Vous pouvez passer au cours suivant !');
        }
        else{
          alert('Cela n\'est pas la bonne réponse ! Essayer encore, ou regarder le cours ou la solution');
        }
      });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  incrementX(){
    this.x = this.x + 1;
  }

  incrementY(){
    this.y = this.y + 1;
  }




}
