import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


interface Admin {
  email: string;
  isAdmin: boolean;
}

interface ItemsResponseObj {
  id_cours: number;
  id_exercice: number;
  titre: string;
  description: string;
  contenu: string;
  mediaPath: string;
  dateDebut: Date;
  dateFin: Date;
}

interface ItemsResponse {
  shows: Array<ItemsResponseObj>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  adminCollection: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;
  // tslint:disable-next-line:ban-types
  items: { type: string; value: any }[] = [];
  // tslint:disable-next-line:max-line-length

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    public db: AngularFirestore
  ) {
    this.http.get('http://localhost:3000/cours/').
    toPromise().then(data => {
      console.log(Object.keys(data).map(key => ({type: key, value: data[key]}))[0].value.description);
      }
    );
  }

  getOneExercice(numero: number) {
    return this.db.collection('exercices', ref => ref.where('numero', '==', numero)).snapshotChanges();
  }


}
