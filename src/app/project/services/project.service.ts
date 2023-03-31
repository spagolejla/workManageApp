import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  URL: string = `${environment.apiUrl}/project`;
  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Array<Project>> {
    return this.httpClient.get<Array<Project>>(this.URL);
  }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post(this.URL, project, { observe: 'response' })
      .pipe(map((response: any) => {
        return response.body;
      }));
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient.put(this.URL, project)
      .pipe(map((response: any) => { return response; }));
  }

  deleteProject(id: string): Observable<boolean> {
    return this.httpClient.delete(this.URL + '/' + id)
      .pipe(map(() => { return true; }));
  }

}
