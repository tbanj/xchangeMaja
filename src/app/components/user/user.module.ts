import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CustomFormsModule } from 'ng2-validation';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyComponent } from './verify/verify.component';
import { SharedModule } from '../../shared/shared.module';
import { WalletSetupComponent } from './wallet-setup/wallet-setup.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
    CustomFormsModule
  ],
  providers: [
  ],
  declarations: [LoginComponent, SignUpComponent, VerifyComponent, WalletSetupComponent]
})
export class UserModule { }
