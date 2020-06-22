import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth/auth.guard';
import {IndexComponent} from './index/index.component';
import { RegisterComponent } from './register/register.component';
import {CoursComponent} from './cours/cours.component';
import { ShowCoursComponent } from './show-cours/show-cours.component';
import { ExercicesComponent } from './exercices/exercices.component';



const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: AccueilComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cours',
    canActivate: [AuthGuard],
    component: CoursComponent
  },
  {
    path: 'showCours',
    canActivate: [AuthGuard],
    component: ShowCoursComponent
  },
  {
    path: 'exercice',
    canActivate: [AuthGuard],
    component: ExercicesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
