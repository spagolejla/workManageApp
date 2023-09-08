import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import * as timesheetActions from '../../../../root-store/timesheet-store/actions';
import * as timesheetSelectors from '../../../../root-store/timesheet-store/selectors';
import { TimesheetStatus } from 'src/app/timesheet/models/timesheet-status.model';
import { Timesheet } from 'src/app/timesheet/models/timesheet.model';


@Component({
  selector: 'ewm-employee-timesheets',
  templateUrl: './employee-timesheets.component.html',
  styleUrls: ['./employee-timesheets.component.scss']
})
export class EmployeeTimesheetsComponent implements OnInit {

  timesheets$ = this.store$.select(timesheetSelectors.selectEmployeeTimesheets);

  TimesheetStatus = TimesheetStatus;
  columns = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: Timesheet) => `${element.date}`,
    },
    {
      columnDef: 'user',
      header: 'Employee',
      cell: (element: Timesheet) => `${element.user}`,
    },   
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: Timesheet) => `${element.status}`,
    },
    {
      columnDef: 'totalHours',
      header: 'Total Hours',
      cell: (element: Timesheet) => `${element.totalHours}`,
    },
    {
      columnDef: 'actions',
      header: 'Actions',
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  userId = this.route.snapshot.paramMap.get('id');


  constructor(
    private store$: Store<TimesheetState.State>,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(timesheetActions.loadTimesheetsByUserRequest({ userId: this.userId }));
  }

  
  openDetails (timesheet: Timesheet) {
    this.store$.dispatch(timesheetActions.loadDataSuccess({timesheets: [timesheet]}))
    this.store$.dispatch(timesheetActions.setSelectedTimesheet({timesheet}))
    this.router.navigate([`/timesheet/details/${timesheet.id}`]);
  }

}
