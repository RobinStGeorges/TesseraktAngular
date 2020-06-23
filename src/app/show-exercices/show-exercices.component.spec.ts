import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExercicesComponent } from './show-exercices.component';

describe('ShowExercicesComponent', () => {
  let component: ShowExercicesComponent;
  let fixture: ComponentFixture<ShowExercicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowExercicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExercicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
