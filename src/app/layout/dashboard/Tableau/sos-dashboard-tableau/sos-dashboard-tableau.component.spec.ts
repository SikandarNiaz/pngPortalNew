import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SosDashboardTableauComponent } from './sos-dashboard-tableau.component';

describe('SosDashboardTableauComponent', () => {
  let component: SosDashboardTableauComponent;
  let fixture: ComponentFixture<SosDashboardTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosDashboardTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SosDashboardTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
