import { Component, OnInit } from '@angular/core';
import { EmployeeState } from 'src/app/root-store/emloyees-store';
import * as employeeActions from '../../../root-store/emloyees-store/actions';
import * as employeeSelectors from '../../../root-store/emloyees-store/selectors';

import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeManageComponent } from '../employee-manage/employee-manage.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees$ = this.store$.select(employeeSelectors.selectFilteredEmployees);
  columns = [
    {
      columnDef: 'firstName',
      header: 'First Name',
      cell: (element: Employee) => `${element.firstName}`,
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      cell: (element: Employee) => `${element.lastName}`,
    },
    {
      columnDef: 'workPosition',
      header: 'Work Position',
      cell: (element: Employee) => `${element.salaryPerHour}`,
    },
    {
      columnDef: 'salaryPerHour',
      header: 'Salary Per Hour',
      cell: (element: Employee) => `${element.salaryPerHour}`,
    },
    {
      columnDef: 'active',
      header: 'Active',
      cell: (element: Employee) => `${element.active}`,
    },
    {
      columnDef: 'actions',
      header: 'Actions',
      cell: (element: Employee) => `${element.active}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(
    private store$: Store<EmployeeState.State>,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(employeeActions.loadDataRequest());
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log(searchValue)
    this.store$.dispatch(employeeActions.setSearchValue({ searchValue }));
  }


  addNewEmployee() {
    const dialogRef = this.dialog.open(EmployeeManageComponent, {
      data: {
        title: 'Add new emloyee',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editEmployee(employee: Employee) {
    this.store$.dispatch(employeeActions.setSelectedEmployee({employee}));
    const dialogRef = this.dialog.open(EmployeeManageComponent, {
      data: {
        title: 'Edit emloyee',
        employeeId: employee.id
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store$.dispatch(employeeActions.setSelectedEmployee({employee: undefined}));
    });
  }

  openDetails(employee: Employee) {

    this.router.navigate(['/employee/details/'+ employee.id])
  }

  deleteEmployee(id: string) {
    this.store$.dispatch(employeeActions.deleteEmployeeeRequest({employeeId: id}));
  }

}
