import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data/data.service';
import {isNull} from "util";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  itemsPerSlide = 2;
  singleSlideOffset = false;
  noWrap = false;
  isLoggedIn: boolean ;

  slides = [
    {image: 'assets/boiteInterne.jpg'},
    {image: 'assets/boiteMaster.png'}
  ];

  constructor(

  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !isNull(localStorage.getItem('user'));
  }



}
