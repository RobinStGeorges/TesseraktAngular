import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TesseraktAngular';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD_LwiqpYaRX5TNXfxVUTF-SmeVC_KxHOk',
      authDomain: 'tesserakt-6980c.firebaseapp.com',
      databaseURL: 'https://tesserakt-6980c.firebaseio.com',
      projectId: 'tesserakt-6980c',
      storageBucket: 'tesserakt-6980c.appspot.com',
      messagingSenderId: '457995310128',
      appId: '1:457995310128:web:6d260af93bc3defe4c09f5',
      measurementId: 'G-CXYYK8YBJ2'
    };
    firebase.initializeApp(firebaseConfig);
  }
}
