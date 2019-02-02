import { Observable } from 'rxjs/Observable';
import { IUser } from './../../user/model/user.model';

import { UserService } from './../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {
  username: string;
  appUser1: any;
  appUser2: any;
  authUser: any;
  constructor(private router: Router,
              private userSrv: UserService,
              private authSrv: AuthService) {
    // this.authSrv.appUser$.subscribe(User => {
    //   this.appUser1 = User;
      // localStorage.setItem('username', this.appUser1.name);
    //  console.log('user', User);
      // this.username = localStorage.getItem('username');
   // });
  }

  ngOnInit() {
        var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })
    this.authUser = this.authSrv.user;
  //  console.log(this.authUser);
    if (this.authUser instanceof Observable) {
      this.authUser
      .subscribe(user => { 
        this.appUser2 = user;
      //  console.log(user);
      }
      );
    }

  }
  logout() {
    this.authSrv.logout();
    // localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
