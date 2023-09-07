import { Component, OnInit } from '@angular/core';
import { TaskState } from 'src/app/root-store/task-store';
import * as taskActions from '../../../root-store/task-store/actions';
import * as taskSelectors from '../../../root-store/task-store/selectors';
import * as projectActions from '../../../root-store/projects-store/actions';
import * as employeeActions from '../../../root-store/emloyees-store/actions';

import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskManageComponent } from '../task-manage/task-manage.component';
import { Router } from '@angular/router';
import { TaskStatus } from '../../models/task-status.model';
import { Priority } from '../../models/task-priority.enum';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks$ = this.store$.select(taskSelectors.selectFilteredTasks);

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
    },
    {
      columnDef: 'actions',
      header: 'Actions',
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(
    private store$: Store<TaskState.State>,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(taskActions.loadDataRequest());
    this.store$.dispatch(projectActions.loadDataRequest());
    this.store$.dispatch(employeeActions.loadDataRequest());
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log(searchValue)
    this.store$.dispatch(taskActions.setSearchValue({ searchValue }));
  }


  addNewTask() {
    const dialogRef = this.dialog.open(TaskManageComponent, {
      data: {
        title: 'Add new task',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editTask(task: Task) {
    this.store$.dispatch(taskActions.setSelectedTask({task}));
    const dialogRef = this.dialog.open(TaskManageComponent, {
      data: {
        title: 'Edit task',
        taskId: task.id
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store$.dispatch(taskActions.setSelectedTask({task: null}));

    });
  }

  openDetails(task: Task) {
    this.router.navigate(['/task/details/'+ task.id])
  }

  deleteTask(id: string) {
    this.store$.dispatch(taskActions.deleteTaskRequest({taskId: id}));
  }

}
