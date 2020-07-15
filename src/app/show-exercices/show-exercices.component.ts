import { CoursDataService } from '../service/cours/cours-data.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import { DataService } from '../service/data/data.service';
import {take} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {environment} from '../../environments/environment';


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
  classList: string[] = ['vide'];


  constructor(
    private cds: CoursDataService,
    private ds: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit(): void {
    // RECUPERE LES DONNEES DE L EXERCICE PAR SON ID
    this.showExercice = true;
    this.idExercice = Number(this.route.snapshot.queryParamMap.get('id'));
    this.http.get(environment.baseUrl + '/getExercice/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.item = response;
        const object = JSON.parse(response[0].cube_needed);
        // MAP LES DONNEES POUR RECUPERER UN ARRAY AVEC LES CUBES NECESSAIRES A L EXERCICE
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
      });

    const emailModified = JSON.parse(localStorage.getItem('user')).login.
      replace('@', '%40').replace('.', '%point');
    // REGARDE SI L'UTILISATEUR A DEJA DES DONNEES SUR CET EXERCICE
    this.http.get(environment.baseUrl + '/user/userdata/' +
      emailModified +
      '/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        // SI PAS DE RESULTAT, CREER UNE ENTRÉE
        if (!response[0]){
          this.http.get(environment.baseUrl + '/exercices/createuserdatarow/' + this.idExercice + '/' + emailModified)
            .pipe(take(1))
            .subscribe((response2: any[]) => {
            });
        }
        // si resultat:
        // : is finished = true => disable btn + btn exo suivant

        // SET IS STARTED TRUE ET DATES TART NOW
        if (!response[0].is_started){
          // set is started to true
          // et date start to now
          this.http.get(environment.baseUrl + '/exercices/setIsStarted/' + this.idExercice + '/' + emailModified)
            .pipe(take(1))
            .subscribe((response2: any[]) => {
            });

        }
      });
  }

  changeImg(path: string) {
    this.imgUrl = 'assets/' + path;
    // tslint:disable-next-line:triple-equals
    this.showExercice = !this.showExercice;
  }

  // VERIFIE SI LES DONN2ES RECU DU CUBE CORRESPONDENT A LA REPONSE DE L'EXERCICE
  checkWithCubes(){
    const emailModified = JSON.parse(localStorage.getItem('user')).login.
    replace('@', '%40').replace('.', '%point');
    this.http.get(environment.baseUrl + '/isValidResponse/' +
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

  // RETOURNE UN ARRAY AVEC N VALEURS
  arrayOne(n: number): any[] {
    return Array(n);
  }

  // CHANGE LA CLASSE D'UNE CASE DU TABLEAU DE REPONSE SELON LA CLASSE ACTUELLE
  manageClass(id: string){
    this.classList =  this.classList.filter((el, i, a) => i === a.indexOf(el));
    const divById = document.getElementById(id);
    if (divById.classList.contains('vide')){
      // REGARDE SI LA DIV EST INIT, SI NON INIT AVEC ARRAYCUBENEDEED[0]
      divById.classList.remove('vide');
      divById.classList.add(this.classList[1]);
      divById.innerText = this.classList[1];
    }
    else{
      // MET LA CLASS +1 DANS LA LISTE DES CLASS NEEDED, SI OUT OF BOUND, 0
      const arraysize = this.classList.length;
      const indexClassInArray = this.classList.indexOf(divById.classList[1]);
      if (indexClassInArray + 1 > arraysize){
        divById.classList.remove(divById.classList[1]);
        divById.classList.add(this.classList[0]);
        divById.innerText = this.classList[0];
      }
      divById.classList.remove(divById.classList[1]);
      divById.classList.add(this.classList[indexClassInArray + 1]);
      divById.innerText = this.classList[indexClassInArray + 1];
    }
  }

  addClassToArray(className: string){
    this.classList.push(className);
  }

  setFinished(idExercice: number){
    // MET L'EXERCICE EN COURS A IS_FINISHED POUR L'UTILISATEUR
    const emailModified = JSON.parse(localStorage.getItem('user')).login.
    replace('@', '%40').replace('.', '%point');

    this.http.get(environment.baseUrl + '/exercicesSetIsFinished/' +
       + this.idExercice + '/' + emailModified)
      .pipe(take(1))
      .subscribe((response: number) => {
        // tslint:disable-next-line:triple-equals
        if (response == 1){
          alert('exercice validé!');
        }
        else {
          alert('erreur lors de la validation, contacter un admin');
        }
      });
  }


}
