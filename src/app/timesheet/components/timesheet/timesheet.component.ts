import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import * as timesheetActions from '../../../root-store/timesheet-store/actions';
import * as timesheetSelectors from '../../../root-store/timesheet-store/selectors';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

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
  //  const date = new Date(dateValue);
    console.log(date)
    this.store$.dispatch(timesheetActions.loadDataRequest({ date }));
  }
}
