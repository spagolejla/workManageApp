import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployeeState } from 'src/app/root-store/emloyees-store';

import * as sharedActions from "../../../root-store/shared-store/actions";
import * as sharedSelectors from "../../../root-store/shared-store/selectors";
import * as taskSelectors from "../../../root-store/task-store/selectors";
import * as taskActions from "../../../root-store/task-store/actions";

import { Router } from '@angular/router';
import { TaskStatus } from 'src/app/task/models/task-status.model';
import { Priority } from 'src/app/task/models/task-priority.enum';
import { Task } from 'src/app/task/models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData$ = this.store$.select(sharedSelectors.selectDashboardData);
  tasks$ = this.store$.select(taskSelectors.selectFilteredTasksDesc);
  
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
    private store$: Store<EmployeeState.State>,
    private router: Router) { }

  ngOnInit(): void {
    this.store$.dispatch(taskActions.loadDataRequest());
    this.store$.dispatch(sharedActions.loadDashboardDataRequest());
  }

  openModule(module: string) {
    this.router.navigate([module])
  }

}
