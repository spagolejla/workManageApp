import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProjectState } from 'src/app/root-store/projects-store';
import * as projectSelectors from '../../../root-store/projects-store/selectors';
import * as projectActions from '../../../root-store/projects-store/actions';
import { Project } from '../../models/project.model';
import { ProjectStatus } from '../../models/project-status-model';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  title = "";
  projectId;
  formGroup!: FormGroup;

  selectedProject$ = this.store$.select(projectSelectors.selectedProjectFromState);

  statusItems = (Object.keys(ProjectStatus) as Array<keyof typeof ProjectStatus>)
  .filter(key => isNaN(Number(key)) && ProjectStatus[key] != 0)
  .map(p => ({
    id: ProjectStatus[p],
    name: p
  }));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProjectManageComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<ProjectState.State>
  ) {
    if (data) {
      this.title = data.title;
      this.projectId = data.projectId;
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
      const project = {
        id: this.projectId ? this.projectId : undefined,
        name: formRawData.name,
        status: formRawData.status,
        description: formRawData.description,
        startDate: formRawData.startDate,
        endDate: formRawData.endDate,
        location: formRawData.location,
        budgetAmount: formRawData.budgetAmount,
      } as Project;

      if (this.projectId != "" && this.projectId != undefined) {
        this.store$.dispatch(projectActions.updateProjecteRequest({ project }))
      } else {
        this.store$.dispatch(projectActions.saveProjecteRequest({ project }))
      }
      this.dialogRef.close();
    }
  }

}
