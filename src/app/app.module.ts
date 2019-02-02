import { SharedModule } from './shared/shared.module';
// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/Core/landing/landing.component';
import { DispenseCashComponent } from './components/dashboard/dispense-cash/dispense-cash.component';
import { SettingComponent } from './components/dashboard/setting/setting.component';
import { NotificationComponent } from './components/dashboard/notification/notification.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { UserProfileComponent } from './components/dashboard/user-profile/user-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
    ],
    imports: [
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
    ],
    providers: [
    ]
})
export class AppModule { }
