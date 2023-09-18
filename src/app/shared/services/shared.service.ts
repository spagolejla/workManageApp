import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DashboardData } from '../models/dashboard-data.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskPerProjectReport } from 'src/app/reports/models/tasks-per-project-report.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private navMenuOpened$ = new BehaviorSubject<boolean>(true);

  URL: string = `${environment.apiUrl}/task`;
  constructor(private httpClient: HttpClient) { }


  onNavMenuToggle(): Observable<boolean> {
    return this.navMenuOpened$.asObservable();
  }

  getTestData(): Observable<any[]> {
    return of([]);
  }

  navMenuToggle() {
    this.navMenuOpened$.next(!this.navMenuOpened$.value);
  }

  closeNavMenu() {
    this.navMenuOpened$.next(false);
  }

  getDashboardData(): Observable<DashboardData> {
    return this.httpClient.get<DashboardData>(this.URL + '/dashboard-data');
  }

  getTasksPerProjectReportData(): Observable<Array<TaskPerProjectReport>> {
    let taskPerProjectReportData: Array<TaskPerProjectReport> = [
      {
        projectId: '1',
        projectName: 'Project 1',
        numberOfTasks: 5
      },
      {
        projectId: '2',
        projectName: 'Project 2',
        numberOfTasks: 50
      },
      {
        projectId: '3',
        projectName: 'Project 3',
        numberOfTasks: 23
      },
      {
        projectId: '4',
        projectName: 'Project 4',
        numberOfTasks: 10
      },
    ];
    return of(taskPerProjectReportData);
   }

}
