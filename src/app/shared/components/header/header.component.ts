import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //isLoggedIn$: Observable<boolean>;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
   // this._service.initUser();
  }

  toggleNavMenu() {
   this.sharedService.navMenuToggle();
  }

  openUserMenu() {
   // this.layoutService.openUserMenu();
  }

}
