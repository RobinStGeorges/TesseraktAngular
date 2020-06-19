import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private router: Router,
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
    this.authService.signInUser(email, password).then(
      (data) => {
        console.log('sucessfuly singin');
        console.log(data);
        localStorage.setItem('user', JSON.stringify({login : email}));
        this.router.navigate(['/home']);
      }
    ).catch(
      (error) => {
        alert('Données incorrectes');
        console.log(error);
      }
    );
  }



}
