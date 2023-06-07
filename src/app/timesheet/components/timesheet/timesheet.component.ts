import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import * as timesheetActions from '../../../root-store/timesheet-store/actions';
import * as timesheetSelectors from '../../../root-store/timesheet-store/selectors';
import { TimesheetStatus } from '../../models/timesheet-status.model';
import { Timesheet } from '../../models/timesheet.model';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  timesheets$ = this.store$.select(timesheetSelectors.selectFilteredTimesheets);

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
  defaultDate = new Date();


  constructor(
    private store$: Store<TimesheetState.State>,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(timesheetActions.loadDataRequest({ date: this.defaultDate }));
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log(searchValue)
    this.store$.dispatch(timesheetActions.setSearchValue({ searchValue }));
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    const date = (event.target).value;
    this.store$.dispatch(timesheetActions.loadDataRequest({ date }));
  }

  openDetails (timesheet: Timesheet) {
    this.store$.dispatch(timesheetActions.setSelectedTimesheet({timesheet}))
    this.router.navigate([`/timesheet/details/${timesheet.id}`]);
  }
}
