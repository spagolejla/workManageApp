import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';

import * as sharedSelectors from '../../../root-store/shared-store/selectors';
import * as sharedActions from '../../../root-store/shared-store/actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedUser$ = this.store$.select(sharedSelectors.selectLoggedInUser);

  constructor(
    private sharedService: SharedService,
    private store$: Store<any>,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  toggleNavMenu() {
   this.sharedService.navMenuToggle();
  }

  openUserMenu() {
  }

  logout() {
    this.store$.dispatch(sharedActions.setLoggedUser({user: null}));
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
