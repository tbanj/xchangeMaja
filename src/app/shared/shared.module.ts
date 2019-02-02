import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './../components/Core/footer/footer.component';
import { HeaderComponent } from './../components/Core/header/header.component';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NotifierModule } from 'angular-notifier';
import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { WalletService } from './services/wallet.service';
import { PaymentService } from './services/payment.service';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotifierModule.withConfig( {
      // Custom options in here
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 1000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 3
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 500,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 500,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    })
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    CurrencyService,
    WalletService,
    PaymentService
   ],
  exports: [
    // components
    HeaderComponent,
    FooterComponent,
    // module
    NotifierModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule]
})
export class SharedModule { }
