import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

export class Cours {
  titre: string;
  contenue: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursDataService {

  constructor(
    public db: AngularFirestore
  ) {
  }

  getAllCours(){
    return this.db.collection('/cours/').snapshotChanges();
  }

  getOneCours(numero: number){
    return this.db.collection('/cours', ref => ref.where('numero', '==', numero)).snapshotChanges();
  }
}
