import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import { myDiffs } from '../../../shared/function/array-difference';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss']
})
export class BuySellComponent implements OnInit {
  currencyArray: Array<any>;
  buyDollar; buyEuro; buyPound;
  wallet = [];
  linkDollar = []; linkEuro = []; linkPounds = [];
  dollar; pounds; euro;
  userInfo;
  constructor(private walletsrv: WalletService, ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.currencyList();
    this.dollar = [ { currency: 'Dollar', symbol: 'USD', sign: '$', bgColor: 'bg-success', link : '/buy-sell/buy-with'}];
    this.pounds = [ { currency: 'Pound', symbol: 'GBP', sign: '&pound;', bgColor: 'bg-primary', link : '/buy-sell/buy-with'}];
    this.euro = [ { currency: 'Euro', symbol: 'EUR', sign: '&euro;', bgColor: 'bg-danger', link : '/buy-sell/buy-with'}];
  //  this.wallet = this.walletsrv.getWallet();
    this.getWallet();



    this.buyDollar = myDiffs(this.wallet, this.dollar);
    this.buyEuro = myDiffs(this.wallet, this.euro);
    this.buyPound = myDiffs(this.wallet, this.pounds);
    this.buyDollar.forEach(element => {
      this.linkDollar.push(
        {currency: element.currency, symbol: element.symbol, sign: element.sign,
          link: '/buy-sell/buy-with', bgColor: element.bgColor
        }
          );
  });
  this.buyEuro.forEach(element => {
    this.linkEuro.push(
      {currency: element.currency, symbol: element.symbol, sign: element.sign,
        link: '/buy-sell/buy-with', bgColor: element.bgColor
      }
        );
});
  this.buyPound.forEach(element => {
    this.linkPounds.push(
      {currency: element.currency, symbol: element.symbol, sign: element.sign,
        link: '/buy-sell/buy-with', bgColor: element.bgColor
      }
        );
  });
// console.log(this.linkEuro);

  }
  getWallet() {
    this.walletsrv.fetchWatch(this.userInfo).subscribe(wal => {
      this.wallet  = wal;
      });
  }
  currencyList() {
    this.currencyArray = [
      { currency: 'british pound', symbol: 'GBP', sign: '€', class: 'bg-danger'},
      { currency: 'US dollar', symbol: 'USD', sign: '$', class: 'bg-success'},
      { currency: 'euro', symbol: 'EUR', sign: '€	', class: 'bg-primary'},
      { currency: 'UAE dirham', symbol: 'AED', sign: '	د.إ', class: 'bg-secondary'},
      { currency: 'chinese yuan', symbol: 'CNY', sign: '¥', class: 'bg-info'},
      { currency: 'indian rupee', symbol: 'INR', sign: '₹', class: 'bg-warning'},
    ];

    // this.buyDollar = [
    //   { currency: 'Naira', sign: '₦', bgColor: 'bg-success', link : '/buy-sell/buy-with'},
    //   { currency: 'Euro', sign: '&euro;', bgColor: 'bg-danger',  link : '/buy-sell/buy-with'},
    //   { currency: 'Pound', sign: '&pound;', bgColor: 'bg-primary',  link : '/buy-sell/buy-with'},
    // ];
  }

}
