import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPeriodsListComponent } from './work-periods-list.component';

describe('WorkPeriodsListComponent', () => {
  let component: WorkPeriodsListComponent;
  let fixture: ComponentFixture<WorkPeriodsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPeriodsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPeriodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
