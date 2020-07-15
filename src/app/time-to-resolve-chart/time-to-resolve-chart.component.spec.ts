import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeToResolveChartComponent } from './time-to-resolve-chart.component';

describe('TimeToResolveChartComponent', () => {
  let component: TimeToResolveChartComponent;
  let fixture: ComponentFixture<TimeToResolveChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeToResolveChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeToResolveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
