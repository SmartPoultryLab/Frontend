import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionHistoryComponent } from './inspection-history.component';

describe('InspectionHistoryComponent', () => {
  let component: InspectionHistoryComponent;
  let fixture: ComponentFixture<InspectionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
