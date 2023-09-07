import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeState } from 'src/app/root-store/emloyees-store';

import * as employeeActions from '../../../root-store/emloyees-store/actions';
import * as sharedSelectors from '../../../root-store/shared-store/selectors';
import * as sharedActions from '../../../root-store/shared-store/actions'


import { Employee } from '../../models/employee.model';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  formGroup!: FormGroup;

  loggedUser$ = this.store$.select(sharedSelectors.selectLoggedInUser);

  changePassword = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserProfileComponent>,
    private fb: FormBuilder,
    private store$: Store<EmployeeState.State>,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

    this.formGroup = this.fb.group(
      {
        telephone: ["", Validators.required],
        shortDescription: ["", Validators.required],
        avatarUrl: [""],
        position: [""],
        oldPassword: [""],
        newPassword: [""],
        confirmPassword: [""],
      },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  get fControls(): any {
    return this.formGroup.controls;
  }

  save(user: any) {
    if (this.formGroup.valid) {
      const formRawData = this.formGroup.getRawValue();
      const employee = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        startWorkDate: user.startWorkDate,
        active: user.active,
        salaryPerHour: user.salaryPerHour,

        password: this.changePassword ? formRawData.newPassword : user.password,
        telephone: formRawData.telephone,
        position: formRawData.position,
        shortDescription: formRawData.shortDescription,
        avatarUrl: formRawData.avatarUrl,
      } as Employee;

      this.store$.dispatch(employeeActions.updateEmployeeeRequest({ employee }))

      if (this.changePassword) {
        this.authService.logout();
        this.store$.dispatch(sharedActions.setLoggedUser({ user: null }));
        this._snackBar.open("Password is changed, please login again!", " ", {
          duration: 3000
        });
        this.router.navigate([`/login`])

      } else {
        this._snackBar.open("Profile edited sucessfully!", " ", {
          duration: 3000
        }
        );
      }

      this.dialogRef.close();
    }


  }

  passwordToggle() {
    this.changePassword = !this.changePassword;
    if (this.changePassword) {
      this.fControls.oldPassword.setValidators([Validators.required])
      this.fControls.newPassword.setValidators([Validators.required])
      this.fControls.confirmPassword.setValidators([Validators.required])

    } else {
      this.fControls.oldPassword.removeVaidators();
      this.fControls.newPassword.removeVaidators();
      this.fControls.confirmPassword.removeVaidators();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const oldPassword = formGroup.get('oldPassword')?.value;
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (formGroup.get('confirmPassword')?.dirty && newPassword != "" && newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    if (!formGroup.get('newPassword')?.dirty) {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

    let userPass = JSON.parse(localStorage.getItem('auth_user') as string).password;
    if (formGroup.get('oldPassword')?.dirty && oldPassword != "" && userPass != oldPassword) {
      formGroup.get('oldPassword')?.setErrors({ invalidOldPassword: true });
    } else {
      formGroup.get('oldPassword')?.setErrors(null);
    }
  }
}
