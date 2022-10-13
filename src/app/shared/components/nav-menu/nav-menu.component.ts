import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, TreeNode } from 'primeng/api';
import { selectCurrentRoute, selectUrl } from 'src/app/root-store/router-selectors';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'wms-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  currentRoute$ = this.store$.select(selectUrl);
  // currentUser: User;
  // isAdmin: boolean;
  // isEducator: boolean;
  // isStudent: boolean;

  constructor(private store$: Store<any>) {
    this.currentRoute$.subscribe(value => console.log('route', value));
  }

  ngOnInit(): void {
    
  }

}
