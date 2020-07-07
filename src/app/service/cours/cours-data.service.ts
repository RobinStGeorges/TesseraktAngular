import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';

export class Cours {
  // tslint:disable-next-line:variable-name
  id_cours: number;
  // tslint:disable-next-line:variable-name
  id_exercice: number;
  titre: string;
  description: string;
  contenu: string;
  mediaPath: string;
  dateDebut: Date;
  dateFin: Date;
}
// tslint:disable-next-line:prefer-const
let allCours: Cours[];

@Injectable({
  providedIn: 'root'
})
export class CoursDataService {

  constructor(
    public db: AngularFirestore,
    private http: HttpClient
  ) {
  }

  getAllCours(){
    // return this.db.collection('/cours/').snapshotChanges();

  }

  getOneCours(numero: number){
    return this.db.collection('cours', ref => ref.where('numero', '==', numero)).snapshotChanges();
  }


}
