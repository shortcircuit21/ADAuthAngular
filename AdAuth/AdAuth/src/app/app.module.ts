import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { C1Component } from './components/c1/c1.component';
import { C2Component } from './components/c2/c2.component';

export const protectedResourceMap: [string, string[]][] =
  [
    [
      'https://localhost:44394/api/values',
      ['api://caba1d96-c885-4714-b0d9-36b37ae7a3ca/api-access']
    ],
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  ];
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    C1Component,
    C2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule.forRoot({
      clientID: "c22b4a0a-d045-4ddd-869d-e0703c42bdeb",
      consentScopes: ["user.read", "openid", "profile", "api://caba1d96-c885-4714-b0d9-36b37ae7a3ca/api-access"],
      authority: "https://login.microsoftonline.com/d18a2e29-430a-4c3a-8be2-f0baa13438c1",
      protectedResourceMap: protectedResourceMap,
      storeAuthStateInCookie: isIE,
      popUp: !isIE,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
