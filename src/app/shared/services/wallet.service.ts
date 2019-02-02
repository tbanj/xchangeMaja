import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

export interface UserWalletI {
  $key: string;
  currency: string;
  balance?: number;
  symbol: string;
  sign: string;
  iconColor: string;
  bgColor: string;
  flagImgUrl: string;
}

@Injectable()
export class WalletService {
  wallet;
  currencyArray;
  constructor(private db: AngularFireDatabase) {
   }
   removeCurrency(user: firebase.User, userWallet: UserWalletI) {
    return this.db.object('/users/' + user.uid + '/wallet/' + userWallet.$key).remove();
   }
  createWallet(user: firebase.User,  userWallet: UserWalletI) {
    return this.db.list('/users/' + user.uid + '/wallet').push({
        currency: userWallet.currency,
        symbol: userWallet.symbol,
        sign: userWallet.sign,
        balance: 0,
        iconColor: userWallet.iconColor,
        bgColor: userWallet.bgColor,
        flagImgUrl: userWallet.flagImgUrl
      });


  }
  createPin(user: firebase.User, userPin) {
    this.db.object('/users/' + user.uid ).update({
      pin: userPin
    });
  }
  fetchWatch(user: firebase.User) {
    return this.db.list('/users/' + user.uid + '/wallet');
  }
  fetchWalletIdBalance(user: firebase.User, walletId) {
   return this.db.object('/users/' + user.uid + '/wallet/' + walletId + '/balance');
  }
  fundWallet(user: firebase.User, walletId, amount) {
    const balance$ = this.fetchWalletIdBalance(user , walletId);
    let balances;
    balance$.subscribe(balance => balances = balance.$value);
    return this.db.object('/users/' + user.uid + '/wallet/' + walletId ).update({
      balance: balances + amount
    });
  }
  getWallet() {
    return  this.wallet = [
      { currency: 'naira', symbol: 'NGN', sign: '₦', balance: '20000.00', iconColor: 'green', bgColor: '#28a745'},
      { currency: 'dollar', symbol: 'USD', sign: '$', balance: '83039.00', iconColor: '#e22d69', bgColor: '#ff00b3'},
      { currency: 'euro', symbol: 'EUR', sign: '€', balance: '92383.00', iconColor: '#4336FB', bgColor: '#007bff'},
    ];

  }
  getAllCurrency() {
    // let allCurrency = [];
    // this.getCun().subscribe(wal => allCurrency = wal);
    // return allCurrency;
    return  this.currencyArray = [
      { currency: 'british pound', symbol: 'GBP', sign: '£', class: 'icon t' , iconColor: '#cc0044',
      bgColor: '#ff0055', flagImgUrl : 'https://cdn.countryflags.com/thumbs/united-kingdom/flag-round-250.png'},
      { currency: 'US dollar', symbol: 'USD', sign: '$', class: 'icon d', iconColor: '#e22d69',
      bgColor: '#ff00b3', flagImgUrl : 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-round-250.png'},
      { currency: 'European euro', symbol: 'EUR', sign: '€', class: 'icon e', iconColor: '#4336FB', bgColor: '#007bff',
      flagImgUrl : 'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png'},
      { currency: 'Nigerian naira', symbol: 'NGN', sign: '₦', class: 'icon d', iconColor: 'green', bgColor: '#28a745',
      flagImgUrl : 'https://cdn.countryflags.com/thumbs/nigeria/flag-round-250.png'},
      { currency: 'UAE dirham', symbol: 'AED', sign: '	د.إ', class: 'icon t', iconColor: '#009999', bgColor: '#00cccc',
      flagImgUrl : 'https://cdn.countryflags.com/thumbs/united-arab-emirates/flag-round-250.png'},
      { currency: 'chinese yuan', symbol: 'CNY', sign: '¥', class: 'icon l', iconColor: '#993366', bgColor: '#c6538c',
      flagImgUrl : 'https://cdn.countryflags.com/thumbs/china/flag-round-250.png'},
      { currency: 'Ghanian Cedi', symbol: 'GHS', sign: '₵', class: 'icon b', iconColor: '#b33c00', bgColor: '#ff5500',
      flagImgUrl : 'https://cdn.countryflags.com/thumbs/ghana/flag-round-250.png'},
    ];
  }
  getCun() {
    return this.db.list('/allCurrencys');
  }


  // use this to add list of currencies to firebase
  getCunl() {
    this.db.object('/allCurrencys/' ).update(this.getAllCurrency());
  }
}
