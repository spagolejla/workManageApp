import { Directive, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

@Directive({ selector: '[connectForm]' })
export class ConnectFormDirective implements OnInit {
  currentValue: any;

  @Input('connectForm')
  set data(val: any) {
    this.currentValue = val;

    if (val) {
      this.formGroupDirective.form.patchValue(val);
      this.formGroupDirective.form.markAsPristine();
    } else {
      this.formGroupDirective.resetForm();
    }
  }

  constructor(private formGroupDirective: FormGroupDirective, private actions$: Actions) {
  }

  ngOnInit(): void {

    this.actions$.pipe(ofType('FORM_RESET'))
      .subscribe(() => {
        this.formGroupDirective.resetForm();
        this.formGroupDirective.form.markAsPristine();
      });

    this.actions$.pipe(ofType('FORM_REVERT_CHANGES'))
      .subscribe(() => {
        if (this.currentValue) {
          this.formGroupDirective.form.patchValue(this.currentValue);
          this.formGroupDirective.form.markAsPristine();
        }
      });
  }

}

export class FormResetAction implements Action {
  readonly type = 'FORM_RESET';
}

export class FormRevertChangesAction implements Action {
  readonly type = 'FORM_REVERT_CHANGES';
}

