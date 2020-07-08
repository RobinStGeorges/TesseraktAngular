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

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    public db: AngularFirestore
  ) {
  }
}
