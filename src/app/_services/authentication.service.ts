import { APIConf } from './APIConf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { User } from '../_models'
import { Observable } from 'rxjs/Rx';


const APP_USER_PROFILE = "NG_CRM_USER_2.0"
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.apiCall('login', user).map((response: Response) => {
        this.doAuth(response);
      });
  }
  register(userData: User) {
    return this.apiCall('register', userData).map((response: Response) => {
      this.doAuth(response);
    });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(APP_USER_PROFILE);
  }

  isAuthenticated() {
    let user =   this.getUser() // <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user && user.isAuthenticated ? true : false;
  }

  getUser(){
    let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user;
  }
  private doAuth(response: Response) {

    const data = (<any>response);
    const user = <User>data.user;
    if (user && data.access_token) {
        user.token = data.access_token;
        user.isAuthenticated = true;
        localStorage.setItem(APP_USER_PROFILE, JSON.stringify(user));
    }
  }
  makeJwtHeaders():HttpHeaders | null {
    let user = this.getUser()
    if (user && user.token) {
      console.log(user.token)
      const headers = new HttpHeaders().set("Authorization", "Bearer " + user.token);
      console.log(headers);
      return headers ;
    }
  }
  private apiCall(endpoint:string,data: any) {
    const self = this;
    const url = `${APIConf.baseURL}${endpoint}`;
    return Observable.fromPromise(new Promise(function (resolve, reject) {
      self.http.post(url, data).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    }));
  }
}


import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ:AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authServ.isAuthenticated()) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authServ.getUser().token}`),
    });

    return next.handle(req1);
  }

}
