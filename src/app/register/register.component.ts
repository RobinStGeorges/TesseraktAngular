import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // model: any = {};
  signinForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(){
    console.log('initialized');
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitSigninForm(){
    console.log('intoOnsubmit');
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authService.signUpUser(email, password).then(
      () => {
        console.log('sucessfuly singin');
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  // versiontest
  // register() {
  //   console.log('Tentative de creation de compte');
  //
  //   // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
  //   localStorage.setItem('user', JSON.stringify({login : this.model.username}));
  //   this.router.navigate(['/home']);
  // }

}
