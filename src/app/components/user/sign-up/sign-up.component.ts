import { WalletService } from './../../../shared/services/wallet.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  error: { name: string, message: string } = { name: '', message: '' };
  private readonly notifier: NotifierService;
  constructor( notifierService: NotifierService,
              private router: Router,
              private authSrv: AuthService,
              private userSrv: UserService,
              private walletSrv: WalletService) {
    this.notifier = notifierService;
  }
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl('',
            [ Validators.required, Validators.maxLength(11)]),
    email: new FormControl('', Validators.required),
    password: new FormControl(
        '', [Validators.required, Validators.minLength(8)]
        )
  });
  ngOnInit() {
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get phone() {
    return this.form.get('phone');
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
        this.notifier.notify( 'success', 'login in successful!' );
        // console.log('succes');
        this.router.navigate(['/wallet']);
    }

  }

  signUpWithEmail(form) {
    // this.walletSrv.getCunl();
    // console.log(this.displayNames);
    if (form.valid) {
     // console.log(form);
          localStorage.setItem('username', this.firstname.value);
         this.authSrv.signUpWithEmail(this.email.value, this.password.value)
          .then(() => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.userSrv.saveUserData(userInfo, form.value);
              this.router.navigate(['/wallet-setup']);
            }
          )
          .catch(_error => {
            this.error = _error;
            this.router.navigate(['/sign-up']);
            this.form.setErrors({
              inva: true
            });
          });
      }
  }



}
