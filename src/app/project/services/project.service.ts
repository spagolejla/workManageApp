import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ProjectStatus } from '../models/project-status-model';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsTestData: Array<Project> = [
    {
      id: '1',
      name: 'Project No. 1',
      description: "Lorem ipsum dolor sit amet",
      startDate: new Date(),
      endDate: new Date(),
      budgetAmount: 100,
      status: ProjectStatus.Created,
      location: "N/A"
    },
    {
      id: '2',
      name: 'Project No. 2',
      description: "Lorem ipsum dolor sit amet",
      startDate: new Date(),
      endDate: new Date(),
      budgetAmount: 100,
      status: ProjectStatus.Created,
      location: "N/A"
    },
    {
      id: '3',
      name: 'Project No. 3',
      description: "Lorem ipsum dolor sit amet",
      startDate: new Date(),
      endDate: new Date(),
      budgetAmount: 100,
      status: ProjectStatus.Created,
      location: "N/A"
    },
    {
      id: '4',
      name: 'Project No. 4',
      description: "Lorem ipsum dolor sit amet",
      startDate: new Date(),
      endDate: new Date(),
      budgetAmount: 100,
      status: ProjectStatus.Created,
      location: "N/A"
    },
    {
      id: '5',
      name: 'Project No. 5',
      description: "Lorem ipsum dolor sit amet",
      startDate: new Date(),
      endDate: new Date(),
      budgetAmount: 100,
      status: ProjectStatus.Created,
      location: "N/A"
    },
    {
      id: '6',
      name: 'Project No. 6',
      description: "Lorem ipsum dolor sit amet",
      startDate: new Date(),
      endDate: new Date(),
      budgetAmount: 100,
      status: ProjectStatus.Created,
      location: "N/A"
    },
  ];
  URL: string = 'api/v1/project/';
  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Array<Project>> {

    return of(this.projectsTestData);
  }

  deleteProject(id: string): Observable<boolean> {
    this.projectsTestData = Object.assign([], this.projectsTestData);
    let index = this.projectsTestData.findIndex(x => x.id == id);
    this.projectsTestData.splice(index, 1);
    return of(true);
    // return this.httpClient.delete(this.URL + id)
    //   .pipe(map(() => { return true; }));
  }

  createProject(project: Project): Observable<Project> {
    console.log(project)
    // var id = (projectsTestData.length + 1).toString();
    // let newProject = {
    //   ...project,
    //   id
    // }

    this.projectsTestData = Object.assign([], this.projectsTestData);
    this.projectsTestData.push(project);
    return of(project);
    // return this.httpClient.post(this.URL, project, { observe: 'response' })
    //   .pipe(map((response: any) => {
    //     return response.body;
    //   }));
  }

  updateProject(project: Project): Observable<Project> {
    this.projectsTestData = Object.assign([], this.projectsTestData);

    const index = this.projectsTestData.findIndex(object => {
      return object.id === project.id;
    }); //  1
    
    if (index !== -1) {
      this.projectsTestData[index] = project;
    }

    return of(project);
    // return this.httpClient.put(this.URL, project)
    //   .pipe(map((response: any) => { return response; }));
  }

}
