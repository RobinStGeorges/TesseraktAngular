import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

interface Admin {
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  adminCollection: AngularFirestoreCollection<Admin>;
  admins: Observable<Admin[]>;

  constructor(
    private firestore: AngularFirestore
  ) {

  }



}
