import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/app/root-store/task-store';
import * as taskSelectors from '../../../root-store/task-store/selectors';
import * as taskActions from '../../../root-store/task-store/actions';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task-status.model';

@Component({
  selector: 'app-task-manage',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.scss']
})
export class TaskManageComponent implements OnInit {

  title = "";
  taskId;
  formGroup!: FormGroup;

  selectedTask$ = this.store$.select(taskSelectors.selectedTaskFromState);

  statusItems = (Object.keys(TaskStatus) as Array<keyof typeof TaskStatus>)
  .filter(key => isNaN(Number(key)) && TaskStatus[key] != 0)
  .map(p => ({
    id: TaskStatus[p],
    name: p
  }));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskManageComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<TaskState.State>
  ) {
    if (data) {
      this.title = data.title;
      this.taskId = data.taskId;
    }
  }

  ngOnInit(): void {

    this.formGroup = this.fb.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required],
        status: ["", Validators.required],
        location: ["", Validators.required],
        budgetAmount: [null],
        startDate: [""],
        endDate: [""],
      }
    );
  }

  get fControls(): any {
    return this.formGroup.controls;
  }

  save() {
    if (this.formGroup.valid) {
      const formRawData = this.formGroup.getRawValue();
      const task = {
        id: this.taskId ? this.taskId : undefined,
        name: formRawData.name,
        status: formRawData.status,
        description: formRawData.description,
        startDate: formRawData.startDate,
        endDate: formRawData.endDate,
        location: formRawData.location,
        budgetAmount: formRawData.budgetAmount,
      } as Task;

      if (this.taskId != "" && this.taskId != undefined) {
        this.store$.dispatch(taskActions.updateTaskRequest({ task }))
      } else {
        this.store$.dispatch(taskActions.saveTaskRequest({ task }))
      }
      this.dialogRef.close();
    }
  }

}
