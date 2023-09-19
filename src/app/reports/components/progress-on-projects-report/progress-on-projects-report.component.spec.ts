import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressOnProjectsReportComponent } from './progress-on-projects-report.component';

describe('ProgressOnProjectsReportComponent', () => {
  let component: ProgressOnProjectsReportComponent;
  let fixture: ComponentFixture<ProgressOnProjectsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressOnProjectsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressOnProjectsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
