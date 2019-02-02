import { SettingComponent } from './setting/setting.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellForComponent } from './buy-sell/sell/sell-for/sell-for.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { TranscationHistoryComponent } from './transcation-history/transcation-history.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { AuthGuardService } from './../../shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { BuyWithComponent } from './buy-sell/buy/buy-with/buy-with.component';
import { DispenseCashComponent } from './dispense-cash/dispense-cash.component';
import { NotificationComponent } from './notification/notification.component';
import { MessagesComponent } from './messages/messages.component';



const routes: Routes = [
    {
      path: 'wallet',
      component: WalletComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'fund-wallet',
      component: FundWalletComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'transaction-history',
      component: TranscationHistoryComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'buy-sell',
      component: BuySellComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'buy-sell/buy-with',
      component: BuyWithComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'buy-sell/sell-for',
      component: SellForComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'dispense-cash',
      component: DispenseCashComponent,
      canActivate: [ AuthGuardService]
    },

    {
      path: 'notification',
      component: NotificationComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'message',
      component: MessagesComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'user-profile',
      component: UserProfileComponent,
      canActivate: [ AuthGuardService]
    },
    {
      path: 'setting',
      component: SettingComponent,
      canActivate: [ AuthGuardService]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
