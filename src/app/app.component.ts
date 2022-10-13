import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Employee Work Manage';
  onDestroy$ = new Subject();
  userMenuOpen= false;
  navigationOpen = true;
  opened: boolean = true;

  subscriptions = [];

  constructor(private sharedService: SharedService, router: Router) {
    this.sharedService
      .onNavMenuToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.navigationOpen = isOpen));

    // this.authService
    // .onHeaderToggle()
    // .pipe(takeUntil(this.onDestroy$))
    // .subscribe(isOpen => (this.headerShowed = isOpen));

  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
  }
  
}
