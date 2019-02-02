import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { LandingComponent } from './components/Core/landing/landing.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '/' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
