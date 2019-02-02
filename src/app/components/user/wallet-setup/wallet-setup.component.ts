import { WalletService, UserWalletI } from './../../../shared/services/wallet.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'firebase';
import { myDiffs } from '../../../shared/function/array-difference';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-wallet-setup',
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.scss']
})
export class WalletSetupComponent implements OnInit, OnDestroy {
  error: { name: string, message: string } = { name: '', message: '' };
  minimumCurrencyError = false;
  allCurrency: any[];
  showListofCurrency = true; showCreatePin = false;
  userId = {};
  userInfo;
  selectedCun;
  fetWallet: any[];
  fetchWallet$;
  fetchWalletsubscription: Subscription;
  user$;
  private readonly notifier: NotifierService;
  constructor( notifierService: NotifierService,
              private walletSrv: WalletService,
              private authSrv: AuthService,
              private router: Router) {
             this.notifier = notifierService;
  }
  form = new FormGroup({
    // currency: new FormControl('', Validators.required),
    password: new FormControl(
        '', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]
        )
  });
  ngOnInit() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.currencyDiff();
  }
  // get currency() {
  //   return this.form.get('currency');
  // }
  get password() {
    return this.form.get('password');
  }
  currencyDiff() {
  //  this.allCurrency = this.walletSrv.getAllCurrency();
   this.walletSrv.getCun().subscribe(cun => this.allCurrency = cun);
    this.fetchWalletsubscription = this.walletSrv.fetchWatch(this.userInfo).subscribe(wal => {
      this.fetWallet = wal;
   // console.log(fetWallet);
    this.allCurrency = myDiffs(this.allCurrency, this.fetWallet);
     });
  }
  createWallet(form) {
    if (form.valid) {
       // setup wallet
      // this.walletSrv.createWallet(this.userInfo, this.selectedCurrency);
      this.walletSrv.createPin(this.userInfo, this.password.value);
      this.notifier.notify( 'success', 'go to wallet' );
             this.router.navigate(['/wallet']);

    } else {
      this.form.setErrors({
        inva: true
      });
    }
  }
  removeCurrency(currency) {
  //  console.log(currency);
    this.walletSrv.removeCurrency(this.userInfo, currency)
      .then(() => this.notifier.notify('warning', 'remove'))
      .catch(err => {
        this.notifier.notify('warning', 'no network');
        console.log(err);
      });
    this.currencyDiff();
  }
  addCurrencyNew(currency) {
    this.selectedCun = currency;
   // console.log(this.selectedCun);
    // this.checkCurrency();
    if (this.fetWallet.length < 4) {
      this.walletSrv.createWallet(this.userInfo, this.newCurrency(this.selectedCun))
      .then(() =>  this.notifier.notify('success', 'added'))
      .catch(err => {
        this.notifier.notify('warning', 'no network');
        console.log(err);
      });
        this.currencyDiff();
    } else {
      this.notifier.notify('warning', 'maximum limit reached');
    }
  }

  // get selectedCurrency() {
  //   let selcun;
  //   this.allCurrency.forEach(element => {
  //     if (this.currencys.value === element.symbol) {
  //       selcun = element;
  //   }
  //   });
  //     return selcun;
  // }

    newCurrency(currency) {
      let selcun;
      this.selectedCun = currency;
      this.allCurrency.forEach(element => {
        if (this.selectedCun === element.symbol) {
           selcun = element;
      }
    });
      return selcun;
    }
    goToPinSetup() {
      if (this.fetWallet.length > 1) {
        this.showCreatePin = true;
        this.showListofCurrency = false;
        this.minimumCurrencyError = false;
      } else {
        this.minimumCurrencyError = true;
      }

    }
  ngOnDestroy() {
    // this.fetchWalletsubscription.unsubscribe();
  }



}


