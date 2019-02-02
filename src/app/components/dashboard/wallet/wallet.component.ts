import { AuthService } from './../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../../../shared/services/currency.service';
import { NotifierService } from 'angular-notifier';
import { myDiffs } from '../../../shared/function/array-difference';
import { WalletService } from '../../../shared/services/wallet.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  form: FormGroup;
  fetchWallet =  [];
  fetWallet;
  allCurrency: any[];
  currencyRate: any;
  fetchWalletsubscription: Subscription;
  nairaRate: any;
  closeModal = true;
  wallet: any;
  formError = false;
  transHtry: Array<any>;
  element: any;
  addCurreny: object;
  currencyArray: any[];
  newCurrencyArray = [];


  private readonly notifier: NotifierService;
  constructor(
    private currencySrv: CurrencyService,
    notifierService: NotifierService,
    private router: Router,
    private authSrv: AuthService,
    private walletSrv: WalletService,
    fb: FormBuilder) {
        this.notifier = notifierService;
        this.form = fb.group({
          currency: ['', Validators.required]
        });

  }

  get currencys() {
    return this.form.get('currency');
  }
  ngOnInit() {
    this.currencyDiff();
    this.currencyFunctRate();
    this.transcFuct();
    this.getWallet();
  }
  currencyFunctRate() {
    this.currencySrv.getCurrency()
      .subscribe(cun => {
        this.currencyRate = cun.rates;
      //  console.log(this.currencyRate);
    for (const k in  this.currencyRate) {
        if ( this.currencyRate.hasOwnProperty(k)) {
          this.currencyArray = this.walletSrv.getAllCurrency();
          this.currencyArray.forEach(con => {
            if (k === con.symbol) {
              const nairaRx = this.currencyRate['NGN'];
              if (( nairaRx / this.currencyRate[k] ) > 1) {
                //  console.log('key is : ' + k + ', value is: '  +  this.currencyRate[k]);
                  this.newCurrencyArray.push({symbol: k, rate: nairaRx / this.currencyRate[k],
                    currency: con.currency, sign: con.sign , class: con.class});
                  // console.log(this.newCurrencyArray);
              }
            }
          });
    }
}
      } );

  }
  getWallet() {
    this.authSrv.user$.subscribe(user => {
      if (user) {
        this.walletSrv.fetchWatch(user)
        .subscribe(wallet => this.fetchWallet = wallet);
      }
  });
  }
  currencyDiff() {
    this.walletSrv.getCun().subscribe(wal => {
      this.allCurrency = wal;
    });
    this.authSrv.user$.subscribe(user => {
    this.fetchWalletsubscription =  this.walletSrv.fetchWatch(user).subscribe(wal => {
       this.fetWallet = wal;
      // console.log(this.fetWallet);
      this.allCurrency = myDiffs(this.allCurrency, this.fetWallet);
      });
    });
  }
  get selectedCurrency() {
    let selcun;
    this.allCurrency.forEach(element => {
      if (this.currencys.value === element.symbol) {
         selcun = element;
    }
  });
    return selcun;
      }
  addNewCurrency(form) {
    if (form.valid) {
      // add to wallet
      this.authSrv.user$.subscribe(user => {
    if (user) {
      // console.log(this.fetWallet.length);
        if (this.fetWallet.length  < 4) {
          this.walletSrv.createWallet(user, this.selectedCurrency);
          this.allCurrency = myDiffs(this.allCurrency, this.fetWallet);
          // console.log(this.fetWallet.length + 1);
          this.form.reset();
          $(function () {
            $('#exampleModal').modal('toggle');
        });
        this.notifier.notify( 'success', 'currency added' );
        } else {
          this.notifier.notify( 'warning', 'maximum limit reached' );
          // console.log('you have reached your limit');

        }
    }
      });
    } else {
      // console.log('invalid form select a value');
      this.formError = true;
    }
  }
  transcFuct() {
    this.transHtry = [
      {
        date: 'November 14,2018 ',
        trans: [
          {id: 1, icon: 'cc-visa', title: 'Topped up wallet via card', detail: 'Visa *****62873', price: '$12009'},
          {id: 2, icon: 'money', title: 'Transfer money to oladapo', detail: 'GTbank - 0063738738', price: '₦37638'},
          {id: 3, icon: 'television', title: 'Paid for Kunle DSTV', detail: '03893738839939', price: '₦1700'},
      ]
      },
      {
        date: 'November 13,2018 ',
        trans: [
          {id: 1, icon: 'mobile', title: 'Airtime for 090536388736', detail: 'Glo', price: '₦500'},
          {id: 2, icon: 'btc', title: 'Wallet funded with Bitcoin', detail: 'Bitcoin-0.03637', price: '$948'},
      ]
      }
    ];
  }
  ngOnDestroy() {

  }
}

