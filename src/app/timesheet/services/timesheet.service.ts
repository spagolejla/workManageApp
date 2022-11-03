import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { TimesheetStatus } from '../models/timesheet-status.model';
import { Timesheet } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  timesheetsTestData: Array<Timesheet> = [
    {
      id: '1',
      date: new Date()
    },
  ];
  URL: string = 'api/v1/timesheet/';
  constructor(private httpClient: HttpClient) { }

  getTimesheets(date: Date): Observable<Array<Timesheet>> {

    return of(this.timesheetsTestData);
  }

  deleteTimesheet(id: string): Observable<boolean> {
    this.timesheetsTestData = Object.assign([], this.timesheetsTestData);
    let index = this.timesheetsTestData.findIndex(x => x.id == id);
    this.timesheetsTestData.splice(index, 1);
    return of(true);
    // return this.httpClient.delete(this.URL + id)
    //   .pipe(map(() => { return true; }));
  }

  createTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    console.log(timesheet)
    // var id = (timesheetsTestData.length + 1).toString();
    // let newTimesheet = {
    //   ...timesheet,
    //   id
    // }

    this.timesheetsTestData = Object.assign([], this.timesheetsTestData);
    this.timesheetsTestData.push(timesheet);
    return of(timesheet);
    // return this.httpClient.post(this.URL, timesheet, { observe: 'response' })
    //   .pipe(map((response: any) => {
    //     return response.body;
    //   }));
  }

  updateTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    this.timesheetsTestData = Object.assign([], this.timesheetsTestData);

    const index = this.timesheetsTestData.findIndex(object => {
      return object.id === timesheet.id;
    }); //  1

    if (index !== -1) {
      this.timesheetsTestData[index] = timesheet;
    }

    return of(timesheet);
    // return this.httpClient.put(this.URL, timesheet)
    //   .pipe(map((response: any) => { return response; }));
  }

}
