import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetActionManageComponent } from './timesheet-action-manage.component';

describe('TimesheetActionManageComponent', () => {
  let component: TimesheetActionManageComponent;
  let fixture: ComponentFixture<TimesheetActionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetActionManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetActionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
