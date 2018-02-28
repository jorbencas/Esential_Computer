import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { BrowserModule } from '@angular/platform-browser';
import { dotenv } from '../../environments/dotenv';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
]);

let providers = {
  "google": {
    "clientId": dotenv.GOOGLE_USER_ID
  },
  "facebook": {
    "clientId": dotenv.FACEBOOK_USER_ID,
    "apiVersion": "v2.4"
  }
};


@NgModule({
  imports: [
    authRouting,
    SharedModule,
    BrowserModule,
    Angular2SocialLoginModule
  ],
  declarations: [
    AuthComponent
  ],

  providers: [
    NoAuthGuard
  ]
})

export class AuthModule {}
Angular2SocialLoginModule.loadProvidersScripts(providers);