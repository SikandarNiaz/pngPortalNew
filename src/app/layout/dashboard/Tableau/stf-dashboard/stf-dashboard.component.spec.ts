import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StfDashboardComponent } from './stf-dashboard.component';

describe('StfDashboardComponent', () => {
  let component: StfDashboardComponent;
  let fixture: ComponentFixture<StfDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StfDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StfDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
