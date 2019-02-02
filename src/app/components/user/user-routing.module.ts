import { AuthGuardService } from './../../shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyComponent } from './verify/verify.component';
import { WalletSetupComponent } from './wallet-setup/wallet-setup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'verify', component: VerifyComponent, canActivate: [AuthGuardService]},
  { path: 'wallet-setup', component: WalletSetupComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
