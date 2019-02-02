import { CurrencyService } from './../../../../shared/services/currency.service';
import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  email: string;
  greeting: string;
  username: string;
  rot: string;
  appUser2: any;
  appUser1: any;
  date: any;
  constructor(
    private authSrv: AuthService,
    // private userSrv: UserService,
    private router: Router,
    ) {
    // this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    this.userRec();
    this.databaseRec();
    this.greetings();
    this.jqueryFunction();
    this.rot = this.router.url;
    this.rot = this.rot.slice(1);
  }
  greetings() {
    this.date = new Date().getHours();
    if (this.date < 12) {
      this.greeting = 'Good Morning';
    } else if (this.date < 21) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
   // console.log(this.greeting);
  }
  userRec() {
    this.authSrv.user.subscribe(user => {
      this.appUser2 = user;
      if (this.appUser2) {
        this.email = this.appUser2.email;
      }
    //  console.log(user);
    }
    );
  }
  databaseRec() {
    this.authSrv.appUser$.subscribe(user => {
      this.appUser1 = user;
      if (this.appUser1) {
        this.username = this.appUser1.name;
      }
    //  console.log(user);
    }
    );
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
  jqueryFunction() {
        /*================================
    sidebar collapsing
    ==================================*/
    $('.nav-btn').on('click', function() {
      $('.page-container').toggleClass('sbar_collapsed');
  });
  /*================================
  sidebar menu
  ==================================*/
  $('#menu').metisMenu();

  /*================================
  slimscroll activation
  ==================================*/
  $('.menu-inner').slimScroll({
      height: 'auto'
  });
  $('.nofity-list').slimScroll({
      height: '435px'
  });
  $('.timeline-area').slimScroll({
      height: '500px'
  });
  $('.recent-activity').slimScroll({
      height: 'calc(100vh - 114px)'
  });
  $('.settings-list').slimScroll({
      height: 'calc(100vh - 158px)'
  });
  }

}
