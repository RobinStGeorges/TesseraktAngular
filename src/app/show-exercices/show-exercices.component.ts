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
import index from '@angular/cli/lib/cli';
import {browser} from 'protractor';


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
  xCarMatrix = 0;
  yCarMatrix = 0;
  xStart = 2;
  yStart = 2 ;
  classList: string[] = ['vide'];
  showCubeDisplay = false;
  coordFinish: string;
  newCarState = 'UP'; // can be UP, DOWN, LEFT and RIGHT
  mapUserResponse = new Map<string, string>();
  waitCount = 0;
  nbCube = 0;
  showModalData = false;

  // DEV, NEED TO CHANGE WITH KEVIN'S INPUT'
  mapIdBoxToAction = new Map<string, string>();

  constructor(
    private cds: CoursDataService,
    private ds: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit(): void {
    // DEV
    this.mapIdBoxToAction.set('1', 'AVANCER');
    this.mapIdBoxToAction.set('2', '=');
    this.mapIdBoxToAction.set('3', 'DEUX');
    // RECUPERE LES DONNEES DE L EXERCICE PAR SON ID
    this.showExercice = true;
    this.idExercice = Number(this.route.snapshot.queryParamMap.get('id'));
    this.http.get(environment.baseUrl + '/getExercice/' + this.idExercice)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.item = response;
        const object = JSON.parse(response[0].cube_needed);
        this.xCarMatrix = JSON.parse(response[0].matrix_size_x_board);
        this.yCarMatrix = JSON.parse(response[0].matrix_size_y_board);
        this.coordFinish = response[0].coord_finish;

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
        this.nbCube = result.length;
      });

    this.showModalData = true;

    this.getUserResponse();

    const emailModified = JSON.parse(localStorage.getItem('user')).login.
      replace('@', '%40').replace('.', '%point');
    // REGARDE SI L'UTILISATEUR A DEJA DES DONNEES SUR CET EXERCICE
    this.http.get(environment.baseUrl + '/userdata/' +
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
    this.setShowCubeDisplay();
    this.initGridExo();
    console.log('aaaaaaaaaaaaah');
    this.getValueFromId(3);
    this.manageCubesAlgo();


    // const emailModified = JSON.parse(localStorage.getItem('user')).login.
    // replace('@', '%40').replace('.', '%point');
    // this.http.get(environment.baseUrl + '/isValidResponse/' +
    //   emailModified +
    //   '/' + this.idExercice)
    //   .pipe(take(1))
    //   .subscribe((response: number) => {
    //     // tslint:disable-next-line:triple-equals
    //     if (response == 1){
    //       alert('Vous avez trouvé la bonne solution grace aux cubes ! Félicitation ! Vous pouvez passer au cours suivant !');
    //     }
    //     else{
    //       alert('Cela n\'est pas la bonne réponse ! Essayer encore, ou regarder le cours ou la solution');
    //     }
    //   });
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

  setShowCubeDisplay(){
    this.showCubeDisplay = this.showCubeDisplay !== true;
  }

  // set les class selon la position de la voiture et son etat
  manageCarPos(x: number, y: number){
    for (let i = 0; i < this.xCarMatrix; i++){
      for (let j = 0 ; j < this.yCarMatrix; j++){
        const divById = document.getElementById('virt' + x + y);
        console.log(' x : ' + x + ' i : ' + i);
        console.log(' y : ' + y + ' j : ' + j);
        if (i === x && j === y){
          // si c'est la bonne pos, ajouter le dernier etat'
          divById.classList.remove('hasCarUP', 'hasCarDOWN', 'hasCarLEFT', 'hasCarRIGHT');
          if (this.newCarState === 'UP'){
            divById.classList.add('hasCarUP');
          }
          else if (this.newCarState === 'DOWN'){
            divById.classList.add('hasCarDOWN');
          }
          else if (this.newCarState === 'LEFT'){
            divById.classList.add('hasCarLEFT');
          }
          else{
            divById.classList.add('hasCarRIGHT');
          }
        }
        // si ce n'est pas la bonne pos, retirer les class car'
        else {
          divById.classList.remove('hasCarUP', 'hasCarDOWN', 'hasCarLEFT', 'hasCarRIGHT');
        }
      }
    }
  }

  getUserResponse(){
    this.http.get(environment.baseUrl + '/getUserResponse')
      .pipe(take(1))
      .subscribe((userResponse: any[]) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < userResponse.length; i++){
          this.mapUserResponse.set('' + userResponse[i].coord_x + userResponse[i].coord_y, userResponse[i].id_box);
        }
      });
  }

  async manageCubesAlgo() {
    console.log('manageAlgo');
    const sizeMap = this.mapUserResponse.size;
    const x = 0;
    let y = 0;
    let isDone = false;
    let isWon = false;
    // tslint:disable-next-line:prefer-const
    let action: string;
    while (!isDone) {
      console.log('boucle start');
      // regarde s'il y a une instruction'

      console.log('map has ?');
      console.log('' + x + '' + y);
      console.log(this.mapUserResponse);
      console.log(this.mapUserResponse.has('' + x + y));

      if (this.mapUserResponse.has('' + x + y)) {

        console.log('get');
        console.log(this.mapUserResponse.get('' + x + y));

        if (this.mapUserResponse.get('' + x + y) === 'AVANCER') { // AVANCER
          if (this.mapUserResponse.get('' + x + y) === '2') { // EGAL
            if (this.mapUserResponse.get('' + x + y) === '3') {
              isDone = this.forward(this.cubeNeeded(3));
            }
          }
        }
      }
      // passe ligne suivante
      if (this.mapUserResponse.has('' + x + (y + 1))) {
        y++;
      } else {
        isDone = true;
      }
      // regarde si la voiture est sur les bonnes coordonnées
      if ('virt' + this.coordFinish === 'virt' + x + y) {
        isWon = true;
        isDone = true;
      }
      console.log('boucle end');
      await this.delay(1000);
    }
    if (isWon) {
      // afficher victoire
    } else {
      // afficher perte
    }
  }

  // bouge la voiture de case selon la direction actuel et la valeur
  forward(value: number){
    switch (this.newCarState) {
      case 'UP':
        if (this.yStart - 1 < 0){
          return false;
        }
        else {
          this.manageCarPos(this.xStart, this. yStart - 1);
        }
        break;

      case 'DOWN':
        if (this.yStart + 1 > this.yCarMatrix){
          return false;
        }
        else {
          this.manageCarPos(this.xStart, this. yStart + 1);
        }
        break;

      case 'LEFT':
        if (this.xStart - 1 < 0){
          return false;
        }
        else{
          this.manageCarPos(this.xStart - 1, this. yStart);
        }
        break;

      case 'RIGHT':
        if (this.xStart + 1 > this.xCarMatrix){
          return false;
        }
        else{
          this.manageCarPos(this.xStart + 1, this. yStart);
        }
        break;
    }
    return true;
  }

  // initialise la matrice de solution virtuelle
  initGridExo(){
    const divById = document.getElementById('virt' + this.xStart + this.yStart);
    divById.classList.add('hasCarUP');
  }

  // fonction async permetant delay entre affichages
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  getValueFromId(idBoite: number){
    return this.cubeNeeded[idBoite];
  }

  hideDeleteData(){
    this.showModalData = false;
  }

  showData()
  {
    this.showModalData = true;
  }

}
