import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { environment } from 'environments/environment';
import { AutocompleteOffDirective } from './autocomplete-off.directive';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './service/auth-guard.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem("mnm-token");
}
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    LoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000', 'localhost:4200'],
        disallowedRoutes: ['/login'],
      },
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AutocompleteOffDirective

  ],
  providers: [
    AuthGuardService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
