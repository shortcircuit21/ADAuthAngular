import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { C1Component } from './components/c1/c1.component';
import { MsalGuard } from '@azure/msal-angular';
import { C2Component } from './components/c2/c2.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/c1" },
  { path: "c1", component: C1Component, canActivate: [MsalGuard] },
  { path: "c2", component: C2Component },
  { path: "**", redirectTo: "/c1" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
