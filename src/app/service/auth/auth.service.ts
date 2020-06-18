import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signUpUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            console.log('conecté');
            resolve();
          }
        ).catch(
          // tslint:disable-next-line:no-shadowed-variable
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            console.log('utilisateur reconnu !');
            resolve();
          }
        ).catch(
          // tslint:disable-next-line:no-shadowed-variable
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
