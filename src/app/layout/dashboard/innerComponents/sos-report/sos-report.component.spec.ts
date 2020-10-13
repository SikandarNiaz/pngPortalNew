import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SosReportComponent } from './sos-report.component';

describe('SosReportComponent', () => {
  let component: SosReportComponent;
  let fixture: ComponentFixture<SosReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SosReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
