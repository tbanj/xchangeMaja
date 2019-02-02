
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: { name: string, message: string } = { name: '', message: '' };
  private readonly notifier: NotifierService;
  constructor( notifierService: NotifierService,
              private router: Router,
              private userSrv: UserService,
              private authSrv: AuthService) {
             this.notifier = notifierService;
            //  this.userSrv.get()
            //  .subscribe(user => console.log(user);
            //  )

  }
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(
        '', [Validators.required, Validators.minLength(8)]
        )
  });
  ngOnInit() {
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  onSubmit(form) {
    if (form.valid) {
      // console.log(form);
      // console.log(this.email.value, this.password.value);
      if ( this.email.value === 'adisco4420@gmail.com' && this.password.value === '44204420') {
        this.notifier.notify( 'success', 'login in successful!' );
        // console.log('succes');
        this.router.navigate(['/wallet']);
      } else {
        this.form.setErrors({
          inva: true
        });
      }
    }
  }
  loginInWithEmail(form) {
        if (form.valid) {
        this.authSrv.loginWithEmail(this.email.value, this.password.value)
        .then(() => {
          // localStorage.setItem('username',l)
          this.notifier.notify( 'success', 'login in successful!' );
          setTimeout(() => {
            this.router.navigate(['/wallet']);
          }, 1500);
        //  console.log('then ', this.email);
        })
        .catch(_error => {
          this.error = _error;
          // console.log(_error);
          this.notifier.notify( 'error', 'invalid creditentials' );
          this.router.navigate(['/login']);
          this.form.setErrors({
            inva: true
          });
        });
      }
  }
}
