import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {
  // stripe = Stripe('pk_test_vHIaSEra9WpCvquoyD72oiVa');
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {this.userId = auth.uid; }
    });
  }

   processPayment(token: any, amount: number) {
     const payment = { token, amount };
     return this.db.list(`/payments/${this.userId}`).push(payment);
   }

}
