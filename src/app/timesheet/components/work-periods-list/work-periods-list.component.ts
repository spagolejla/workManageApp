import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import { WorkPeriod } from '../../models/work-period.model';

@Component({
  selector: 'work-periods-list',
  templateUrl: './work-periods-list.component.html',
  styleUrls: ['./work-periods-list.component.scss']
})
export class WorkPeriodsListComponent implements OnInit {

  @Input()
  workPeriods: Array<WorkPeriod> = [];

  columns = [
    {
      columnDef: 'task',
      header: 'Task',
      cell: (element: WorkPeriod) => `${element.task}`,
    },
    {
      columnDef: 'start',
      header: 'Start',
      cell: (element: WorkPeriod) => `${element.start}`,
    },   
    {
      columnDef: 'end',
      header: 'End',
      cell: (element: WorkPeriod) => `${element.end}`,
    },
    {
      columnDef: 'totalHours',
      header: 'Total Hours',
      cell: (element: WorkPeriod) => `${element.totalHours}`,
    }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  defaultDate = new Date();

  constructor(
    private store$: Store<TimesheetState.State>,
  ) { }

  ngOnInit(): void {
   // this.store$.dispatch(timesheetActions.loadDataRequest({ date: this.defaultDate }));
  }

  getTotalHours() {
    return this.workPeriods.filter(x => x.totalHours != undefined).map(t => t.totalHours).reduce((acc: number, value) => acc + value, 0);
  }

 





}
