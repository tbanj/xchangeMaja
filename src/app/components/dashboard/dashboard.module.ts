import { NgModule } from '@angular/core';
import { WalletComponent } from './wallet/wallet.component';
import { DashboardRoutingModule } from './dashboard-routing';
import { NgxPayPalModule } from 'ngx-paypal';

import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { DashboardHeaderComponent } from './common/header/header.component';
import { DashboardFooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { TranscationHistoryComponent } from './transcation-history/transcation-history.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { BuyWithComponent } from './buy-sell/buy/buy-with/buy-with.component';
import { SellForComponent } from './buy-sell/sell/sell-for/sell-for.component';
import { DispenseCashComponent } from './dispense-cash/dispense-cash.component';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './notification/notification.component';
import { MessagesComponent } from './messages/messages.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    NgxPayPalModule,
  ],
  declarations: [
    WalletComponent,
    FundWalletComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    SidebarComponent,
    TranscationHistoryComponent,
    BuySellComponent,
    BuyWithComponent,
    SellForComponent,
    DispenseCashComponent,
    SettingComponent,
    NotificationComponent,
    MessagesComponent,
    UserProfileComponent,

  ]
})
export class DashboardModule { }
