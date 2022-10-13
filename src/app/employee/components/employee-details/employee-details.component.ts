import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeState } from 'src/app/root-store/emloyees-store';
import * as employeeSelectors from '../../../root-store/emloyees-store/selectors';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  selectedEmployee$ = this.store$.select(employeeSelectors.selectedEmployee);

  constructor(
    private router: Router,
    private store$: Store<EmployeeState.State>
  ) {

  }

  ngOnInit(): void {

    this.selectedEmployee$.subscribe(value => console.log(value));
  }

  goBack() {
    this.router.navigate(['/employee']);
  }

}
