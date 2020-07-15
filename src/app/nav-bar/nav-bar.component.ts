import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {isNull} from 'util';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn =  !isNull(localStorage.getItem('user'));
  }

  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
