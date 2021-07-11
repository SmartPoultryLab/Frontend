import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionExaminationComponent } from './inspection-examination.component';

describe('InspectionExaminationComponent', () => {
  let component: InspectionExaminationComponent;
  let fixture: ComponentFixture<InspectionExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
