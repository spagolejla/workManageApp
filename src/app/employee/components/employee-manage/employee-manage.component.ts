import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeState } from 'src/app/root-store/emloyees-store';
import * as employeeSelectors from '../../../root-store/emloyees-store/selectors';
import * as employeeActions from '../../../root-store/emloyees-store/actions';

import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {
  title = "";
  employeeId;
  formGroup!: FormGroup;

  selectedEmployee$ = this.store$.select(employeeSelectors.selectedEmployeeFromState);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeManageComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<EmployeeState.State>
  ) {
    if (data) {
      this.title = data.title;
      this.employeeId = data.employeeId;
    }
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          null,
          Validators.compose([Validators.email])
        ],
        telephone: ["", Validators.required],
        shortDescription: ["", Validators.required],
        avatarUrl: [""],
        active: [null],
        position: [""],
        salaryPerHour: [null],
        startWorkDate: [null],
        password: [null],
        // password: [
        //   null,
        //   Validators.compose([
        //     Validators.required,
        //     // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        //     // CustomValidators.patternValidator(/[A-Z]/, {
        //     //   hasCapitalCase: true
        //     // }),
        //     // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        //     Validators.minLength(8)
        //   ])
        // ],
        // confirmPassword: [null]
      },
      {
        // check whether our password and confirm password match
        //validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  get fControls(): any {
    return this.formGroup.controls;
  }

  save() {
    if (this.formGroup.valid) {
      const formRawData = this.formGroup.getRawValue();
      const employee = {
        id: this.employeeId? this.employeeId : undefined,
        firstName: formRawData.firstName,
        lastName: formRawData.lastName,
        email: formRawData.email,
        password: formRawData.telephone,
        telephone: formRawData.telephone,
        position: formRawData.position,
        startWorkDate: formRawData.startWorkDate,
        shortDescription: formRawData.shortDescription,
        salaryPerHour: formRawData.salaryPerHour,
        active: formRawData.active,
        avatarUrl: formRawData.avatarUrl,
      } as Employee;

      if (this.employeeId != "" && this.employeeId != undefined) {
        this.store$.dispatch(employeeActions.updateEmployeeeRequest({ employee }))
      } else {
        employee.password = 'Test1234!';
        this.store$.dispatch(employeeActions.saveEmployeeeRequest({ employee }))
      }
      this.dialogRef.close();
    }
  }
}
