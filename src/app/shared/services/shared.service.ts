import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DashboardData } from '../models/dashboard-data.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
