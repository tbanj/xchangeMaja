import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LandingComponent } from './components/Core/landing/landing.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: '', loadChildren: './components/user/user.module#UserModule'},
    { path: '', loadChildren: './components/dashboard/dashboard.module#DashboardModule'},

    { path: '**', redirectTo: '/' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
