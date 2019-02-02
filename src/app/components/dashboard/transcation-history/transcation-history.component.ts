import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transcation-history',
  templateUrl: './transcation-history.component.html',
  styleUrls: ['./transcation-history.component.scss']
})
export class TranscationHistoryComponent implements OnInit {
  transHtry: Array<any>;
  constructor() { }

  ngOnInit() {
    this.transcFuct();
  }

  transcFuct() {
    this.transHtry = [
      {
        date: 'November 15,2018 ',
        trans: [
          {id: 1, icon: 'cc-visa', title: 'Topped up wallet via card', detail: 'Visa *****62873', price: '$12009'},
          {id: 2, icon: 'money', title: 'Transfer money to oladapo', detail: 'GTbank - 0063738738', price: '₦37638'},
          {id: 3, icon: 'television', title: 'Paid for Kunle DSTV', detail: '03893738839939', price: '₦1700'},
      ]
      },
      {
        date: 'November 14,2018 ',
        trans: [
          {id: 1, icon: 'mobile', title: 'Airtime for 090536388736', detail: 'Glo', price: '₦500'},
          {id: 2, icon: 'btc', title: 'Wallet funded with Bitcoin', detail: 'Bitcoin-0.03637', price: '$948'},
          {id: 3, icon: 'euro', title: 'Change Naira to Euro', detail: 'Euro &euro;763', price: '₦3739'},
      ]
      },
      {
        date: 'November 13,2018 ',
        trans: [
          {id: 1, icon: 'bank', title: 'Send money to Tunde', detail: 'Firstbank-3028383664', price: '₦9500'},
          {id: 2, icon: 'signal', title: 'Paid for internet connection', detail: 'Swift-363993', price: '₦2000'},
          {id: 3, icon: 'lightbulb-o', title: 'Paid for electricity', detail: 'EKDEC-67388366363', price: '₦5000'},
      ]
      }
    ];
    this.transHtry.forEach(element => {
      // console.log(element);
    });
  }
}
