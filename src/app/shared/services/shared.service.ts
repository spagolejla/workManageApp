import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 // private userMenuOpened$ = new BehaviorSubject<boolean>(false);
  private navMenuOpened$ = new BehaviorSubject<boolean>(true);

  constructor() { }

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


  // onUserMenuToggle(): Observable<boolean> {
  //   return this.userMenuOpened$.asObservable();
  // }

  // openUserMenu() {
  //   this.userMenuOpened$.next(true);
  // }

  // closeUserMenu() {
  //   this.userMenuOpened$.next(false);
  // }

  


  // onUserProfileToggle(): Observable<boolean> {
  //   return this.userMenuOpened$.asObservable();
  // }

  // openUserProfile() {
  //   this.userMenuOpened$.next(true);
  // }

  // closeUserProfile() {
  //   this.userMenuOpened$.next(false);
  // }
}
