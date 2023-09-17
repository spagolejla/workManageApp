import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  URL: string = `${environment.apiUrl}/task`;
  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Array<Task>> {
   return this.httpClient.get<Array<Task>>(this.URL);
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post(this.URL, task, { observe: 'response' })
      .pipe(map((response: any) => {
        return response.body;
      }));
  }


  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put(this.URL, task)
      .pipe(map((response: any) => { return response; }));
  }

  deleteTask(id: string): Observable<boolean> {
    return this.httpClient.delete(this.URL + '/' +id)
      .pipe(map(() => { return true; }));
  }

  



}
