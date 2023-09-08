import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';
import { environment } from 'src/environments/environment';
import { TimesheetAction } from '../models/timesheet-action.model';
import { TimesheetStatus } from '../models/timesheet-status.model';
import { Timesheet } from '../models/timesheet.model';
import { WorkPeriod } from '../models/work-period.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  timesheetActionsTestData: Array<TimesheetAction> = [
    {
      id: '1',
      status: TimesheetStatus.Open,
      comment: "Lorem ipsum dolor sit amet",
      user: { id: '1', name: 'Lejla' },
      date: new Date()
    },
    {
      id: '1',
      status: TimesheetStatus.Approved,
      comment: "Lorem ipsum dolor sit amet",
      user: { id: '1', name: 'Lejla' },
      date: new Date()
    }
  ]

  workPeriodsTestData: Array<WorkPeriod> = [
    {
      id: '1',
      start: new Date(),
      end: new Date(),
      totalHours: 5.5,
      task: {
        id: '1',
        taskNo: 1,
        title: 'Test',
        description: "Task 1",
        startDate: new Date(),
        endDate: new Date(),
        status: 1,
        priority: 3,
        project: { id: '1', name: 'deded' },
        assigner: { id: '1', name: 'Lejla' }
      },
    },
    {
      id: '1',
      start: new Date(),
      end: new Date(),
      totalHours: 5.5,
      task: {
        id: '1',
        taskNo: 2,
        title: 'Test',
        description: "Task 1",
        startDate: new Date(),
        endDate: new Date(),
        status: 1,
        priority: 3,
        project: { id: '1', name: 'deded' },
        assigner: { id: '1', name: 'Lejla' }
      },
    },
    {
      id: '1',
      start: new Date(),
      end: new Date(),
      totalHours: 5.5,
      task: {
        id: '1',
        taskNo: 3,
        title: 'Test',
        description: "Task 1",
        startDate: new Date(),
        endDate: new Date(),
        status: 1,
        priority: 3,
        project: { id: '1', name: 'deded' },
        assigner: { id: '1', name: 'Lejla' }
      },
    }
  ]

  timesheetsTestData: Array<Timesheet> = [
    {
      id: '1',
      date: new Date(),
      user: { id: '1', name: 'Test' } as Item,
      status: TimesheetStatus.Approved,
      totalHours: 8,
      workPeriods: this.workPeriodsTestData,
      actions: this.timesheetActionsTestData
    },
    {
      id: '2',
      date: new Date(),
      user: { id: '1', name: 'dd' } as Item,
      status: TimesheetStatus.Open,
      totalHours: 8,
      workPeriods: [],
      actions: []
    },
    {
      id: '3',
      date: new Date(),
      user: { id: '1', name: 'dd' } as Item,
      status: TimesheetStatus.Submited,
      totalHours: 8,
      workPeriods: [],
      actions: []
    },
    {
      id: '4',
      date: new Date(),
      user: { id: '1', name: 'dd' } as Item,
      status: TimesheetStatus.Approved,
      totalHours: 8,
      workPeriods: [],
      actions: []
    },
    {
      id: '5',
      date: new Date(),
      user: { id: '1', name: 'dd' } as Item,
      status: TimesheetStatus.Rejected,
      totalHours: 8,
      workPeriods: [],
      actions: []
    },
    {
      id: '6',
      date: new Date(),
      user: { id: '1', name: 'dd' } as Item,
      status: TimesheetStatus.Edited,
      totalHours: 8,
      workPeriods: [],
      actions: []
    },
  ];
  URL: string = `${environment.apiUrl}/timesheet`;

  constructor(private httpClient: HttpClient) { }

  getTimesheets(date: Date): Observable<Array<Timesheet>> {
    const options = date ?
      { params: new HttpParams().set('date', date.toDateString()) } : {};
    return this.httpClient.get<Array<Timesheet>>(`${this.URL}/getByDate`, options)
  }

  getTimesheetsByUser(userId: string): Observable<Array<Timesheet>> {
    const options = userId ?
      { params: new HttpParams().set('userId', userId) } : {};
    return this.httpClient.get<Array<Timesheet>>(`${this.URL}/getByUser`, options)
  }

  deleteTimesheet(id: string): Observable<boolean> {
    this.timesheetsTestData = Object.assign([], this.timesheetsTestData);
    let index = this.timesheetsTestData.findIndex(x => x.id == id);
    this.timesheetsTestData.splice(index, 1);
    return of(true);
    // return this.httpClient.delete(this.URL + id)
    //   .pipe(map(() => { return true; }));
  }


  updateTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.httpClient.put(this.URL, timesheet)
      .pipe(map((response: any) => { return response; }));
  }

}
