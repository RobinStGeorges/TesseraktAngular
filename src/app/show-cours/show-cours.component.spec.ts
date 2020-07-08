import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoursComponent } from './show-cours.component';

describe('ShowCoursComponent', () => {
  let component: ShowCoursComponent;
  let fixture: ComponentFixture<ShowCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
