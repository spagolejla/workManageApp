import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPerProjectReportComponent } from './task-per-project-report.component';

describe('TaskPerProjectReportComponent', () => {
  let component: TaskPerProjectReportComponent;
  let fixture: ComponentFixture<TaskPerProjectReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPerProjectReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPerProjectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
