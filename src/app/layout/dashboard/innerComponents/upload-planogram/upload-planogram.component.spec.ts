import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlanogramComponent } from './upload-planogram.component';

describe('UploadPlanogramComponent', () => {
  let component: UploadPlanogramComponent;
  let fixture: ComponentFixture<UploadPlanogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPlanogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPlanogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
