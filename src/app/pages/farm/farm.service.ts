import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService, BackendService} from '../../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Farm,BaiscFarm } from './farm';
import {Router} from "@angular/router";
import {NotificationsService} from "../../_services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FarmOptions} from "../../_models";

@Injectable()
export class FarmService {
  private basicAction = 'farms/';

  constructor(private backend:BackendService,private authService:AuthenticationService,private router:Router,private notify:NotificationsService,private loader: NgxSpinnerService,) { }
  public HandleErr(err:any){
    const self =this;
    self.authService.logout();
    self.router.navigate(['/login']);
    self.loader.hide();
    self.notify.toast('error', 'Server Error');
    console.log(err);
  }


  getFarms(): Observable<Farm[]> {
    const self = this;
    self.loader.show();
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doGet(`${self.basicAction}`).then((response: Farm[]) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }))
  }
  getFarmsOptions():Observable<FarmOptions>{
    const self = this;
    self.loader.show();
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doGet(`options`).then((response: FarmOptions) => {
        self.loader.hide();
        console.log(response);
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }))
  }
  getFarmById(farmid:number) :Observable<Farm> {
    const self = this;
    self.loader.show();
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doGet(`${self.basicAction}${farmid}`).then((response: Farm) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }));
  }
  saveFarm(farm:BaiscFarm){
    const self =this;
    if (farm.id == 0)
      return Observable.fromPromise(new Promise(function (resolve, reject) {
        self.backend.doPost(`${self.basicAction}`,farm).then((response: any) => {
          self.loader.hide();
          resolve(response);
        }).catch(err => {
          self.HandleErr(err);
          reject(err);
        })
      }));
    else
      return Observable.fromPromise(new Promise(function (resolve, reject) {
        self.backend.doPatch(`${self.basicAction}${farm.id}`,farm).then((response: any) => {
          self.loader.hide();
          resolve(response);
        }).catch(err => {
          self.HandleErr(err);
          reject(err);
        })
      }));
  }

  deleteFarm(farmid:number){
    const self =this;
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doDelete(`${self.basicAction}${farmid}`).then((response: any) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }));
  }





  initializeFarm(): Farm {
    // Return an initialized object
    return {
      id: 0,
      owner_id:null,
      owner_name:null,

      bird_id:null,
      bird_name:null,

      farm_name:null,

      breed_id:null,
      breed_name:null,
      housing_name:null,
      food_name:null,
      food_id:null,
      num_of_breeds:null,
      housing_id:null,
      start_date:null
    };
  }
}
