import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import { TimesheetAction } from '../../models/timesheet-action.model';
import { TimesheetStatus } from '../../models/timesheet-status.model';

@Component({
  selector: 'timesheet-actions',
  templateUrl: './timesheet-actions.component.html',
  styleUrls: ['./timesheet-actions.component.scss']
})
export class TimesheetActionsComponent implements OnInit {

  @Input()
  workPeriods: Array<TimesheetAction> = [];

  TimesheetStatus = TimesheetStatus;
  columns = [
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: TimesheetAction) => `${element.status}`,
    },
    {
      columnDef: 'comment',
      header: 'Comment',
      cell: (element: TimesheetAction) => `${element.comment}`,
    },   
    {
      columnDef: 'user',
      header: 'User',
      cell: (element: TimesheetAction) => `${element.user}`,
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: TimesheetAction) => `${element.date}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  defaultDate = new Date();

  constructor(
    private store$: Store<TimesheetState.State>,
  ) { }

  ngOnInit(): void {
   // this.store$.dispatch(timesheetActions.loadDataRequest({ date: this.defaultDate }));
  }

}
