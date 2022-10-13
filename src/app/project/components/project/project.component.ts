import { Component, OnInit } from '@angular/core';
import { ProjectState } from 'src/app/root-store/projects-store';
import * as projectActions from '../../../root-store/projects-store/actions';
import * as projectSelectors from '../../../root-store/projects-store/selectors';

import { Store } from '@ngrx/store';
import { Project } from '../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectManageComponent } from '../project-manage/project-manage.component';
import { Router } from '@angular/router';
import { ProjectStatus, ProjectStatusString } from '../../models/project-status-model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects$ = this.store$.select(projectSelectors.selectFilteredProjects);

  ProjectStatus = ProjectStatus;
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Project) => `${element.name}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (element: Project) => `${element.description}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: Project) => `${element.status}`,
    },
    {
      columnDef: 'budgetAmount',
      header: 'Budget Amount',
      cell: (element: Project) => `${element.budgetAmount}`,
    },
    {
      columnDef: 'location',
      header: 'Location',
      cell: (element: Project) => `${element.location}`,
    },
    {
      columnDef: 'startDate',
      header: 'Start Date',
      cell: (element: Project) => `${element.startDate}`,
    },
    {
      columnDef: 'endDate',
      header: 'End Date',
      cell: (element: Project) => `${element.endDate}`,
    },
    {
      columnDef: 'actions',
      header: 'Actions',
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(
    private store$: Store<ProjectState.State>,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(projectActions.loadDataRequest());
  }

  applyFilter(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log(searchValue)
    this.store$.dispatch(projectActions.setSearchValue({ searchValue }));
  }


  addNewProject() {
    const dialogRef = this.dialog.open(ProjectManageComponent, {
      data: {
        title: 'Add new project',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editProject(project: Project) {
    this.store$.dispatch(projectActions.setSelectedProject({project}));
    const dialogRef = this.dialog.open(ProjectManageComponent, {
      data: {
        title: 'Edit project',
        projectId: project.id
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store$.dispatch(projectActions.setSelectedProject({project: null}));

    });
  }

  openDetails(project: Project) {

    this.router.navigate(['/project/details/'+ project.id])
  }

  deleteProject(id: string) {
    this.store$.dispatch(projectActions.deleteProjecteRequest({projectId: id}));
  }

}
