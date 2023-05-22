import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AdminLayoutModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
