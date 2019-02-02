import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot,  } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authSrv: AuthService,
    private router: Router
    ) { }

  canActivate(route, state: RouterStateSnapshot) {
    let obs = this.authSrv.user$;

    if ( obs instanceof Observable) {
      return obs.map(user => {
        if  (user) {
          return true;
        } else {
          this.router.navigate(['/login'],
          {
            queryParams: { returnUrl: state.url}
          });
          return false;
        }
      });
    } else {
      if (obs) {
        return true;
      }  else {
        this.router.navigate(['/login'],
        {
          queryParams: { returnUrl: state.url}
        });
        return false;
      }
    }


  }

}
