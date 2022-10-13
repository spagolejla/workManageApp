import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeState } from 'src/app/root-store/emloyees-store';
import * as employeeSelectors from '../../../../root-store/emloyees-store/selectors';

@Component({
  selector: 'ewm-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss']
})
export class BasicDataComponent implements OnInit {

  selectedEmployee$ = this.store$.select(employeeSelectors.selectedEmployee);

  constructor(
    private router: Router,
    private store$: Store<EmployeeState.State>
  ) {

  }
  ngOnInit(): void {
   //throw new Error('Method not implemented.');
  }

}
