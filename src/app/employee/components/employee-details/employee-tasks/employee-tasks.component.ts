import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskState } from 'src/app/root-store/task-store';
import { Task } from '../../../../task/models/task.model';
import { TaskStatus } from 'src/app/task/models/task-status.model';
import { Priority } from 'src/app/task/models/task-priority.enum';

import * as taskActions from '../../../../root-store/task-store/actions';
import * as taskSelectors from '../../../../root-store/task-store/selectors';

@Component({
  selector: 'ewm-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.scss']
})
export class EmployeeTasksComponent implements OnInit {

  tasks$ = this.store$.select(taskSelectors.selectTasksByEmployeeById(this.route.snapshot.paramMap.get('id')));

  TaskStatus = TaskStatus;
  Priority = Priority;
  columns = [
    {
      columnDef: 'taskNo',
      header: 'Task No.',
      cell: (element: Task) => `${element.taskNo}`,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: Task) => `${element.title}`,
    },
    {
      columnDef: 'priority',
      header: 'Priority',
      cell: (element: Task) => `${element.priority}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: Task) => `${element.status}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (element: Task) => `${element.description}`,
    },
    {
      columnDef: 'startDate',
      header: 'Start',
      cell: (element: Task) => `${element.startDate}`,
    },
    {
      columnDef: 'endDate',
      header: 'End',
      cell: (element: Task) => `${element.endDate}`,
    },
    {
      columnDef: 'project',
      header: 'Project',
      cell: (element: Task) => `${element.project}`,
    },
    {
      columnDef: 'assigner',
      header: 'Assigner',
      cell: (element: Task) => `${element.assigner}`,
    }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  
  constructor(
    private store$: Store<TaskState.State>,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(taskActions.loadDataRequest());
  }

}
