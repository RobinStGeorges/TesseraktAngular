import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './service/auth/auth.service';
import { RegisterComponent } from './register/register.component';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {environment} from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { CoursComponent } from './cours/cours.component';
import { ShowCoursComponent } from './show-cours/show-cours.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavBarComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    CoursComponent,
    ShowCoursComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule
  ],
  providers: [
    AuthService,
    AngularFirestoreModule,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
