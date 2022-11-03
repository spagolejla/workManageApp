import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/app/root-store/task-store';
import * as taskSelectors from '../../../root-store/task-store/selectors';
import * as employeeSelectors from '../../../root-store/emloyees-store/selectors';
import * as projectSelectors from '../../../root-store/projects-store/selectors';

import * as taskActions from '../../../root-store/task-store/actions';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task-status.model';
import { Priority } from '../../models/task-priority.enum';
import { Observable, of } from 'rxjs';
import { Employee } from 'src/app/employee/models/employee.model';
import { Project } from 'src/app/project/models/project.model';

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
  assigners$: Observable<Employee[]> = this.store$.select(employeeSelectors.selectEmployees); 
  projects$: Observable<Project[]>  = this.store$.select(projectSelectors.selectProjects);

  statusItems = (Object.keys(TaskStatus) as Array<keyof typeof TaskStatus>)
  .filter(key => isNaN(Number(key)) && TaskStatus[key] != 0)
  .map(p => ({
    id: TaskStatus[p],
    name: p
  }));

  priorityItems = (Object.keys(Priority) as Array<keyof typeof Priority>)
  .filter(key => isNaN(Number(key)) && Priority[key] != 0)
  .map(p => ({
    id: Priority[p],
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
        title: ["", Validators.required],
        description: ["", Validators.required],
        status: ["", Validators.required],
        priority: ["", Validators.required],
        project: [null],
        assigner: [null],
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
        taskNo: formRawData.taskNo,
        title: formRawData.title,
        description: formRawData.description,
        startDate: formRawData.startDate,
        endDate: formRawData.endDate,
        assigner: formRawData.assigner,
        project: formRawData.project,
        status: formRawData.status,
        priority: formRawData.priority,
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
