import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss']
})
export class C1Component implements OnInit {
  private subscription: Subscription;
  userData: any;
  url = "https://graph.microsoft.com/v1.0/me";

  constructor(private httpClient: HttpClient, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.getLocalApi();
    this.getUSerProfile();
    this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log("acquire token success " + JSON.stringify(payload));
    });
  }
  
  getUSerProfile() {
    this.httpClient.get(this.url)
      .subscribe(data => {
        this.userData = data;
        console.log(data);
      }, error => {
        console.error(" Http get request to MS Graph failed" + JSON.stringify(error));
      });
  }

  getLocalApi() {
    let header = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem("myToken")}` });
    this.httpClient.get<any>("https://localhost:44394/api/values", { headers: header }).subscribe(res => { console.log(res.message); });
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
