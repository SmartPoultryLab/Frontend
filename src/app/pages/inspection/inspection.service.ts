import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService, BackendService} from '../../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {BasicInspection, Inspection, MeasuredData, Units} from './inspection';
import {Router} from "@angular/router";
import {NotificationsService} from "../../_services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class InspectionService {
  private basicAction = 'inspections/';

  constructor(private backend:BackendService,private authService:AuthenticationService,private router:Router,private notify:NotificationsService,private loader: NgxSpinnerService,) { }
  public HandleErr(err:any){
    const self =this;
    self.authService.logout();
    self.router.navigate(['/login']);
    self.loader.hide();
    self.notify.toast('error', 'Server Error');
    console.log(err);
  }

  getInspections(): Observable<Inspection[]> {
    const self = this;
    self.loader.show();
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doGet(`${self.basicAction}`).then((response: Inspection[]) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }))
  }

  getInspectionById(inspection_id:number):Observable<Inspection>{
    const self = this;
    self.loader.show();
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doGet(`${self.basicAction}${inspection_id}`).then((response: Inspection) => {
        self.loader.hide();
        console.log(response);
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }));
  }



  deleteInspection(inspection_id: number): Observable<Response> {
    const self =this;
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doDelete(`${self.basicAction}${inspection_id}`).then((response: any) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }));
  }

  saveInspection(inspection: BasicInspection): Observable<Inspection> {
    const self =this;
    if (inspection.id === 0) return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doPost(`${self.basicAction}`, inspection).then((response: any) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }));
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.backend.doPatch(`${self.basicAction}${inspection.id}`,inspection).then((response: any) => {
        self.loader.hide();
        resolve(response);
      }).catch(err => {
        self.HandleErr(err);
        reject(err);
      })
    }));
  }

  decodeInspection(inspection:Inspection):Inspection{
    let decoded_inspection = inspection;
    return decoded_inspection
  }

  initializeInspection(farm_id?:number): Inspection {
    // Return an initialized object
    const id = farm_id ? farm_id : 0;
    return {
      id: 0,
      farm_id:id,
      inspection_date:new Date(),
      current_age:<MeasuredData>{value:null,unit:Units.age[0]},
      dead_last_3_days:null,
      feed_consumption:<MeasuredData>{value:null,unit:Units.mass[1]},
      water_consumption:<MeasuredData>{value:null,unit:Units.water[0]},
      average_weight:<MeasuredData>{value:null,unit:Units.mass[1]},
      other_notes:null,
      clinical_signs:null,
      pm_lesions:null,
      diagnoses:null,
    };
  }
}
