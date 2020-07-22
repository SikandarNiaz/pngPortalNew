import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDashboardTableauComponent } from './sku-dashboard-tableau.component';

describe('SkuDashboardTableauComponent', () => {
  let component: SkuDashboardTableauComponent;
  let fixture: ComponentFixture<SkuDashboardTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuDashboardTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuDashboardTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
