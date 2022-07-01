import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiserAttendanceMapViewComponent } from './merchandiser-attendance-map-view.component';

describe('MerchandiserAttendanceMapViewComponent', () => {
  let component: MerchandiserAttendanceMapViewComponent;
  let fixture: ComponentFixture<MerchandiserAttendanceMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiserAttendanceMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiserAttendanceMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
