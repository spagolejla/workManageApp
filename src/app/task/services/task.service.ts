import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Priority } from '../models/task-priority.enum';
import { TaskStatus } from '../models/task-status.model';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksTestData: Array<Task> = [
    {
      id: '1',
      taskNo: 1,
      title: 'Test',
      description: "Task 1",
      startDate: new Date(),
      endDate: new Date(),
      status: TaskStatus.Created,
      priority: Priority.High,
      project: { id: '1', name: 'deded'},
      assigner: { id: '1', name: 'Lejla'}
    },
  ];
  URL: string = 'api/v1/task/';
  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Array<Task>> {

    return of(this.tasksTestData);
  }

  deleteTask(id: string): Observable<boolean> {
    this.tasksTestData = Object.assign([], this.tasksTestData);
    let index = this.tasksTestData.findIndex(x => x.id == id);
    this.tasksTestData.splice(index, 1);
    return of(true);
    // return this.httpClient.delete(this.URL + id)
    //   .pipe(map(() => { return true; }));
  }

  createTask(task: Task): Observable<Task> {
    console.log(task)
    // var id = (tasksTestData.length + 1).toString();
    // let newTask = {
    //   ...task,
    //   id
    // }

    this.tasksTestData = Object.assign([], this.tasksTestData);
    this.tasksTestData.push(task);
    return of(task);
    // return this.httpClient.post(this.URL, task, { observe: 'response' })
    //   .pipe(map((response: any) => {
    //     return response.body;
    //   }));
  }

  updateTask(task: Task): Observable<Task> {
    this.tasksTestData = Object.assign([], this.tasksTestData);

    const index = this.tasksTestData.findIndex(object => {
      return object.id === task.id;
    }); //  1
    
    if (index !== -1) {
      this.tasksTestData[index] = task;
    }

    return of(task);
    // return this.httpClient.put(this.URL, task)
    //   .pipe(map((response: any) => { return response; }));
  }

}
