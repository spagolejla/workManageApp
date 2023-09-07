import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployeeState } from 'src/app/root-store/emloyees-store';

import * as sharedActions from "../../../root-store/shared-store/actions";
import * as sharedSelectors from "../../../root-store/shared-store/selectors";
import { Router } from '@angular/router';

export interface Task {
  taskNo: string;
  title: string;
  priority: number;
  assigners: string;
}

const ELEMENT_DATA: Task[] = [
  { taskNo: "1", title: 'Hydrogen', priority: 1, assigners: 'H' },
  { taskNo: "2", title: 'Helium', priority: 2, assigners: 'He' },
  { taskNo: "3", title: 'Lithium', priority: 3, assigners: 'Li' },
  { taskNo: "4", title: 'Beryllium', priority: 3, assigners: 'Be' },
  { taskNo: "5", title: 'Boron', priority: 2, assigners: 'B' },
  { taskNo: "6", title: 'Carbon', priority: 3, assigners: 'C' },
  { taskNo: "7", title: 'Nitrogen', priority: 3, assigners: 'N' },
  { taskNo: "8", title: 'Oxygen', priority: 3, assigners: 'O' },
  { taskNo: "9", title: 'Fluorine', priority: 2, assigners: 'F' },
  { taskNo: "10", title: 'Neon', priority: 1, assigners: 'Ne' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData$ = this.store.select(sharedSelectors.selectDashboardData);

  columns = [
    {
      columnDef: 'taskNo',
      header: 'No.',
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
      columnDef: 'assigners',
      header: 'Assigners',
      cell: (element: Task) => `${element.assigners}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(
    private store: Store<EmployeeState.State>,
    private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(sharedActions.loadDashboardDataRequest());
  }

  openModule(module: string) {
    this.router.navigate([module])
  }

}
