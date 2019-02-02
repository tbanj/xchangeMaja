import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../../../shared/services/payment.service';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType, PayPalFunding } from 'ngx-paypal';
import { of } from 'rxjs/observable/of';
import { WalletService } from '../../../shared/services/wallet.service';
import { log } from 'util';
declare var getpaidSetup: any;
@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {
  formError = false;
  paymentOptionError = false;
  flutterwave = false;
  paymentForm = true;
  paypal = false;
   funds: FormGroup;
  handler: any;
  amount = 0;
  currencys: 'USD';
  userInfo;
  statusText;
  selectedCurrency: any[];
  cunArray: Array<any>;
  paymentType = [
    { name: 'Fund with card', value: 'card', icon: 'fa fa-credit-card'},
    // { name: 'Fund with paypal', value: 'paypal', icon: 'fa fa-cc-paypal'},
  ];

  private readonly notifier: NotifierService;
  public payPalConfig?: PayPalConfig;

  constructor(fb: FormBuilder, notifierService: NotifierService,
              private paymentSvc: PaymentService,
              private walletSrv: WalletService,
              public router: Router) {
    this.notifier = notifierService;
    this.funds = fb.group({
      price: [ '', Validators.required],
      fundType: [ '', Validators.required],
      currency: ['', Validators.required]
    });

  }
  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.stripeHandle();
    this.paypalInitConfig();
    this.getWallet();

  }
  // getAllCurrency() {
  // let allCurrency = this.walletSrv.getAllCurrency();
  //  this.cunArray = allCurrency;
  // console.log(allCurrency);

  // }
  getWallet() {
    this.walletSrv.fetchWatch(this.userInfo).subscribe(wallet => {
      console.log(wallet);

      this.cunArray = wallet;
    });
  }
  get price() {
    return this.funds.get('price');
  }
  get currency() {
    return this.funds.get('currency');
  }
  get fundType() {
    return this.funds.get('fundType');
  }
  fundWallet(funds) {
    if (funds.valid) {
     // set amount and currency to localStorage
      // let amountCurrency: any = { amount: this.price.value, currency: this.currency.value};
      // amountCurrency = JSON.stringify(amountCurrency);
      // localStorage.setItem('amountCurrency' , amountCurrency);
      // get amount and currency from localStorage
      // const getAmountCurrency = JSON.parse(localStorage.getItem('amountCurrency'));
      // this.amount = getAmountCurrency.amount;
      // this.currencys = getAmountCurrency.currency;

      // set amount and currency
      this.amount = this.price.value;
      this.currencys = this.currency.value;

      this.cunArray.forEach(element => {
        if (element.symbol === this.currencys) {
          this.selectedCurrency = element.$key;
          console.log(this.selectedCurrency);
        }
      });

      if (this.fundType.value === 'card' && this.currency.value !== 'NGh') {
        this.handlePayment();
       console.log('go to stripe');
       this.paymentOptionError = false;
      } else if (this.fundType.value === 'paypal' && this.currency.value !== 'NGN') {
        console.log('go to paypal');
        this.paypal = true;
        this.paymentForm = false;
        this.paymentOptionError = false;
      // this.router.navigate(['payment/paypal']);
      } else if (this.fundType.value === 'card' && this.currency.value === 'NGN') {
        this.flutterWave();
        this.paymentOptionError = false;
      } else {
        this.paymentOptionError = true;
      }
    } else  {
      this.formError = true;
      this.paymentOptionError = false;
    }

  }
  goBack() {
    this.paypal = false;
    this.paymentForm = true;
    this.funds.reset();
  }
  // stripe payment
  stripeHandle() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://static.thenounproject.com/png/29456-200.png',
      locale: 'auto',
      token: token => {
        console.log(token);
        this.fundWalletBalance();
      //  console.log(this.amount);
     this.paymentSvc.processPayment(token, this.amount);
      }
    });
  }
  handlePayment() {
    this.handler.open({
      name: 'Xchange',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount * 100,
      currency: this.currencys,
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
    this.handler.close();
    }

    // flutterwave
    payWithRave() {

      const API_publicKey = 'FLWPUBK-4d10b2f4698ca76050a0750a071a592f-X';
         const x = getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: 'user@example.com',
            amount: this.amount,
            customer_phone: '234099940409',
            currency: this.currencys,
            // redirect_url: this.router.navigate(['wallet']),
            txref: 'rave-123456',
            meta: [{
                metaname: 'flightID',
                metavalue: 'AP1234'
            }],
            onclose: function() {
            },
            callback: function(response) {
                const txref = response.tx.txRef; // collect txRef returned and pass to a server page to complete status check.
                console.log('This is the response returned after a charge', response);
                if (
                    response.tx.chargeResponseCode === '00' ||
                    response.tx.chargeResponseCode === '0'
                ) {
                    // redirect to a success page
                    console.log('success');
                    this.statusText = 'success';
                    console.log(this.statusText);
                } else {
                    // redirect to a failure page.

                }
                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }
    flutterWave() {
      this.payWithRave();
    }

    // paypal
    private paypalInitConfig(): void {
      this.payPalConfig = new PayPalConfig(
        PayPalIntegrationType.ClientSideREST,
        PayPalEnvironment.Sandbox,
        {
          commit: true,
          client: {
            sandbox:
              'c7k3dcxtdzs4w497$42f185c3946d41b6fa44313bdd1c7410'
            //  access_token$sandbox$c7k3dcxtdzs4w497$42f185c3946d41b6fa44313bdd1c7410
          },
          button: {
            label: 'paypal',
            layout: 'vertical'
          },
          onAuthorize: (data, actions) => {
            console.log('Authorize');
            return of(undefined);
          },
          onPaymentComplete: (data, actions) => {
            console.log('OnPaymentComplete');
          },
          onCancel: (data, actions) => {
            console.log('OnCancel');
          },
          onError: err => {
            console.log('OnError');
          },
          onClick: () => {
            console.log('onClick');
          },
          validate: (actions) => {
            console.log(actions);
          },
          experience: {
            noShipping: true,
            brandName: 'Xchange'
          },
          transactions: [
            {
              amount: {
                total: this.amount,
                currency: this.currencys,
                details: {
                  subtotal: 30.00,
                  tax: 0.07,
                  shipping: 0.03,
                  handling_fee: 1.00,
                  shipping_discount: -1.00,
                  insurance: 0.01
                }
              },
              custom: 'Custom value',
            }
          ],
          note_to_payer: 'Contact us if you have troubles processing payment'
        }
      );
    }
    private  fundWalletBalance() {
      this.walletSrv.fundWallet(this.userInfo, this.selectedCurrency, this.amount);
      this.notifier.notify( 'success', 'wallet funded' );
      setTimeout(() => {
        this.router.navigate(['/wallet']);
      }, 1000);
    }
}
