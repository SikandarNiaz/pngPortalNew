import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauHelperComponent } from './tableau-helper.component';

describe('TableauHelperComponent', () => {
  let component: TableauHelperComponent;
  let fixture: ComponentFixture<TableauHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
