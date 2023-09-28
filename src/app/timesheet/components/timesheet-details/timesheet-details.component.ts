import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import { TimesheetStatus } from '../../models/timesheet-status.model';
import * as timesheetSelectors from '../../../root-store/timesheet-store/selectors';
import * as timesheetActions from '../../../root-store/timesheet-store/actions';
import { TimesheetAction } from '../../models/timesheet-action.model';
import { FormControl } from '@angular/forms';
import { Timesheet } from '../../models/timesheet.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {

  disabled = false;
  selectedTimesheet$ = this.store$.select(timesheetSelectors.selectedTimesheet).pipe(tap((timesheet) => {
    if (timesheet) {
      this.disabled = timesheet.status != TimesheetStatus.Submited
    }
  }));

  TimesheetStatus = TimesheetStatus;
  defaultDate = new Date();
  actionComment = new FormControl('');

  constructor(
    private router: Router,
    private store$: Store<TimesheetState.State>
  ) {

  }

  ngOnInit(): void {
    let previousDate = localStorage.getItem('timesheet-date');
    if (previousDate) {
      this.defaultDate = new Date(previousDate);
    }
    this.store$.dispatch(timesheetActions.loadDataRequest({ date: this.defaultDate }));
    this.selectedTimesheet$.subscribe(value => console.log(value))
  }

  goBack() {
    this.router.navigate(['/timesheet']);
  }

  updateTimesheetAction(timesheetData: Timesheet, status: TimesheetStatus) {
    let timesheet: Timesheet = {
      id: timesheetData.id,
      date: timesheetData.date,
      user: timesheetData.user,
      status: timesheetData.status,
      totalHours: timesheetData.totalHours,
      workPeriods: timesheetData.workPeriods,
      actions: timesheetData.actions?.map(action => action)
    }
    timesheet.status = status;
    let timesheetAction: TimesheetAction = {
      id: '',
      status,
      comment: this.actionComment.value,
      user: { name: 'Lejla Spago', id: '9c937ee4-c992-4b5b-aedc-e21358214286' }, // TODO: get user when login is finished
      date: new Date()
    }



    timesheet?.actions?.push(timesheetAction);

    this.store$.dispatch(timesheetActions.updateTimesheetRequest({ timesheet }));
    this.actionComment.reset();

  }

}
