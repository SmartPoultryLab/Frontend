import { NotificationsService } from './notification.service';
import { SummaryObj } from './../_models/Summary';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({ providedIn: 'root'})
export class APIService {
  constructor(private backend:BackendService,private authService:AuthenticationService,private router:Router,private notify:NotificationsService,private loader: NgxSpinnerService,) { }
  public getDashBoardSummary():Observable<SummaryObj[]> {
    const self = this;
    self.loader.show();
    return Observable.fromPromise(new Promise(function (resolve,reject) {
      self.backend.doGet(`summary`).then((response: SummaryObj[]) => {
        self.loader.hide();
        console.log(response)
        resolve(response);
      }).catch(err => {
        self.authService.logout();
        self.router.navigate(['/login']);
        self.loader.hide();
        self.notify.toast('error', 'Server Error')
        reject(err);
      })
    }));
  }
}

