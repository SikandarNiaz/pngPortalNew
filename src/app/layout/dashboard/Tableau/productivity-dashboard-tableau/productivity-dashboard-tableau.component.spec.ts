import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityDashboardTableauComponent } from './productivity-dashboard-tableau.component';

describe('ProductivityDashboardTableauComponent', () => {
  let component: ProductivityDashboardTableauComponent;
  let fixture: ComponentFixture<ProductivityDashboardTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductivityDashboardTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductivityDashboardTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
