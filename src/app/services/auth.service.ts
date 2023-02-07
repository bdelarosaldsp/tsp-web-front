import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subscription, throwError } from 'rxjs';
import { Account } from '../models/account';
import { SignupRequest } from '../models/request/signup-request';
import { SignupResponse } from '../models/response/signup-response';
import { Constant } from '../shared/constant';
import { GlobalService } from './core/global.service';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';
export type AccountModel = Account | undefined;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  currentUser$: Observable<AccountModel>;
  isLoading$: Observable<boolean>;
  agency$ : Observable<any>;
  currentUserSubject: BehaviorSubject<AccountModel>;
  isLoadingSubject: BehaviorSubject<boolean>;
  apiBase:string;
  constructor(private globalService: GlobalService, private config:ConfigService, private http: GlobalService) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<AccountModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.agency$ = of(Constant.AUTH.getAgency());
    this.apiBase=config.getConfig().apiUrl;
  }
  preLogin(data:any): Observable<any> {
    this.isLoadingSubject.next(true)
    return this.globalService
      .post(this.apiBase+Constant.Endpoints.AUTH.PRE_LOGIN, data)
      .pipe(
        map(res => {
          this.isLoadingSubject.next(false)  
          return res;
        }),catchError((err:any)=>{
          this.isLoadingSubject.next(false)
          return throwError (err)})
      );
  }
  login(data:any): Observable<any> {
    this.isLoadingSubject.next(true)
    return this.globalService
      .post(this.apiBase+Constant.Endpoints.AUTH.LOGIN, data)
      .pipe(
        map(res => {
          localStorage.setItem(Constant.AUTH.KEYS.token, res.data['token']?.plainTextToken);
          localStorage.setItem(Constant.AUTH.KEYS.token_expires, res.data['token']?.AccessToken?.expired_at);
          localStorage.setItem(Constant.AUTH.KEYS.userData, JSON.stringify(res.data['user']));  
          this.isLoadingSubject.next(false)  
          return res;
        }),catchError((err:any)=>{
          this.isLoadingSubject.next(false)
          return throwError (err)})
      );
  }
  enable2fa(data : any){
    return this.globalService.post(this.apiBase+Constant.Endpoints.AUTH.ENABLE_2_FA, data).pipe(
      map(res => {
        localStorage.setItem(Constant.AUTH.KEYS.userData, JSON.stringify(res.data['user']));  
        return res;
      })
    );
  }
  getQr() {
    return this.globalService.get(this.apiBase+Constant.Endpoints.AUTH.GET_QR).pipe(
     map(res => {
       return res;
     })
   );
 }
  verifyToken(id:number) {

    return this.globalService.get(this.apiBase+Constant.Endpoints.AUTH.VERIFY_TOKEN +'/'+id).pipe(
     map(res => {

       return res;
     })
   );
 }
  singUp(data : SignupRequest): Observable<any> {
    this.isLoadingSubject.next(true)
    return this.http
    .post(this.apiBase+Constant.Endpoints.AUTH.SING_UP, data)
    .pipe(
      map(res => {
        this.isLoadingSubject.next(false)
      return res;
      },(err:any) => {
        this.isLoadingSubject.next(false);
        return  err;
      }),catchError((err:any)=>{
        this.isLoadingSubject.next(false)
        return throwError (err)
      })
    );
    
  }
  isLoggedIn() {
    let user = JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.userData)!);
    let token = localStorage.getItem(Constant.AUTH.KEYS.token);
    if (user && token) {
      return true;
    }
    localStorage.removeItem(Constant.AUTH.KEYS.token);
    localStorage.removeItem(Constant.AUTH.KEYS.userData);
    return false;
  }
  getLocaUser(){
    return  JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.userData)!);
  }
  logout(): Observable<any> {
    
     return this.globalService.get(this.apiBase+Constant.Endpoints.AUTH.LOGOUT).pipe(
       map(res => { 
        localStorage.removeItem(Constant.AUTH.KEYS.token);
        localStorage.removeItem(Constant.AUTH.KEYS.userData);
        localStorage.removeItem(Constant.AUTH.KEYS.agency);
         return res;
       },
       (err : any) => {
        localStorage.removeItem(Constant.AUTH.KEYS.token);
        localStorage.removeItem(Constant.AUTH.KEYS.userData);
        localStorage.removeItem(Constant.AUTH.KEYS.agency);
       }
       )
     );
   }
   password_reset_request(data:any): Observable<any> {
    this.isLoadingSubject.next(true)
    return this.globalService
      .post(this.apiBase+Constant.Endpoints.AUTH.RESET_PASSWORD_REQUEST,  {email:data})
      .pipe(
        map(res => {
             this.isLoadingSubject.next(false)
             return res;
        }),catchError((err:any)=>{
          this.isLoadingSubject.next(false)
          return err})
      );
  }
  RESET_PASSWORD_FIND(data:any): Observable<any> {
    return this.globalService
      .get(`${this.apiBase+Constant.Endpoints.AUTH.RESET_PASSWORD_FIND}/${data}`)
      .pipe(
        map(res => {
             return res;
        })
      );
  }
  reset_password(data:any): Observable<any> {
    this.isLoadingSubject.next(true)
    return this.globalService
      .post(`${this.apiBase+Constant.Endpoints.AUTH.RESET_PASSWORD}`, data)
      .pipe(
        map(res => {
          this.isLoadingSubject.next(false)
             return res;
        }),catchError((err:any)=>{
          this.isLoadingSubject.next(false)
          return throwError (err)
        })
      );
  }
  
  change_password(data:any): Observable<any> {
    this.isLoadingSubject.next(true)
    return this.globalService
      .put(`${this.apiBase+Constant.Endpoints.AUTH.CHANGE_PASSWORD}`, data)
      .pipe(
        map(res => {
          this.isLoadingSubject.next(false)
             return res;
        }),catchError((err:any)=>{
          this.isLoadingSubject.next(false)
          return throwError (err)
        })
      );
  }

  findAndActivate(token: string) {
    return this.globalService
      .get(this.apiBase+Constant.Endpoints.AUTH.SING_UP_ACTIVATE + '/' + token)
      .pipe(
        map(res => {
         
          return res;
        })
      );
  }
  setAgency(agency:any){
    localStorage.setItem(Constant.AUTH.KEYS.agency, JSON.stringify(agency));
    this.agency$ = of(Constant.AUTH.getAgency());

  }

  validateExternal(email:string,nitcli:string) {

    return this.globalService.get(this.apiBase+Constant.Endpoints.AUTH.SING_UP_EXTERNAL +'/'+email+'/'+nitcli).pipe(
     map(res => {

       return res;
     })
   );
 }
}
