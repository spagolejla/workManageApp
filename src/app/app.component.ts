import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from './shared/services/shared.service';
import { Store } from '@ngrx/store';
import * as sharedSelectors from '../app/root-store/shared-store/selectors'
import * as sharedActions from '../app/root-store/shared-store/actions'

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Employee Work Manage';
  onDestroy$ = new Subject();
  userMenuOpen= false;
  navigationOpen = true;
  opened: boolean = true;

  subscriptions = [];

  loggedUser$ = this.store$.select(sharedSelectors.selectLoggedInUser);


  constructor(
    private sharedService: SharedService, 
    private store$: Store<any>,
    private authService: AuthService) {
    this.sharedService
      .onNavMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.navigationOpen = isOpen));

  }

  ngOnInit(): void {
    let user = this.authService.getUser();
    this.store$.dispatch(sharedActions.setLoggedUser({user}));
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
  }
  
}
