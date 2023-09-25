import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DashboardData } from '../models/dashboard-data.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskPerProjectReport } from 'src/app/reports/models/tasks-per-project-report.model';
import { ProgressOnProjectReportModel } from 'src/app/reports/models/progress-on-project-report.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private navMenuOpened$ = new BehaviorSubject<boolean>(true);

  URL: string = `${environment.apiUrl}`;
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
    return this.httpClient.get<DashboardData>(this.URL + '/task/dashboard-data');
  }

  getTasksPerProjectReportData(): Observable<Array<TaskPerProjectReport>> {
    return this.httpClient.get<Array<TaskPerProjectReport>>(this.URL + '/task/task-per-project-report');
  }

  getProgressOnProjecttReportData(): Observable<Array<ProgressOnProjectReportModel>> {
    return this.httpClient.get<Array<ProgressOnProjectReportModel>>(this.URL + '/task/progress-on-project-report');
  }

}
