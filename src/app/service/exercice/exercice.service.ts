import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  constructor(
    public db: AngularFirestore
  ) {
  }

  getAllExercice(){
    return this.db.collection('/exercices/').snapshotChanges();
  }

  getOneExercice(numero: number){
    return this.db.collection('exercices', ref => ref.where('numero', '==', numero)).snapshotChanges();
  }
}
