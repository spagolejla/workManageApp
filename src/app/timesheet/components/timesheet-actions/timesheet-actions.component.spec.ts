import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetActionsComponent } from './timesheet-actions.component';

describe('TimesheetActionsComponent', () => {
  let component: TimesheetActionsComponent;
  let fixture: ComponentFixture<TimesheetActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
