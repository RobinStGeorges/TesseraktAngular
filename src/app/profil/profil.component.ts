import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from '../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userEmail: string;
  showModal: boolean;
  showModalData: boolean;
  registerForm: FormGroup;
  submitted = false;
  timeToSolve = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  show()
  {
    this.showModal = true;

  }

  showData()
  {
    this.showModalData = true;
  }

  hide()
  {
    this.showModal = false;
  }

  hideDeleteData(){
    this.showModalData = false;
  }

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user')).login;
    this.getTimeToSolve();
    // modalForm
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted)
    {
      this.showModal = false;
      firebase.auth().signInWithEmailAndPassword(
        this.registerForm.get('email').value,
        this.registerForm.get('password').value)
        // tslint:disable-next-line:only-arrow-functions
        .then(function(info) {
          const user = firebase.auth().currentUser;
          user.delete();
          localStorage.removeItem('user');
        });
      this.router.navigate(['/login']);
    }
  }

  deleteuserData(){
    this.http.get(environment.baseUrl + '/user/delete/' + JSON.parse(localStorage.getItem('user')).login)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        console.log(response);
      });
    this.router.navigate(['/profil']);
  }

  deleteUser(){
    this.authService.deleteUser();
  }

  getTimeToSolve(){
    const emailModified = JSON.parse(localStorage.getItem('user')).login.
    replace('@', '%40').replace('.', '%point');
    this.http.get(environment.baseUrl + '/getTimeToSolve/' + emailModified )
      .pipe(take(1))
      .subscribe((response: any[]) => {
        console.log(response);
        this.timeToSolve = response;
      });
  }

}
