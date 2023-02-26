import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TimesheetState } from 'src/app/root-store/timesheet-store';
import { TimesheetStatus } from '../../models/timesheet-status.model';
import * as timesheetSelectors from '../../../root-store/timesheet-store/selectors';
import * as timesheetActions from '../../../root-store/timesheet-store/actions';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {

  selectedTimesheet$ = this.store$.select(timesheetSelectors.selectedTimesheet);

  TimesheetStatus = TimesheetStatus;
  defaultDate = new Date();
  
  constructor(
    private router: Router,
    private store$: Store<TimesheetState.State>
  ) {

  }

  ngOnInit(): void {
    this.store$.dispatch(timesheetActions.loadDataRequest({ date: this.defaultDate }));
    this.selectedTimesheet$.subscribe(value => console.log(value))
  }

  goBack() {
    this.router.navigate(['/timesheet']);
  }

}
