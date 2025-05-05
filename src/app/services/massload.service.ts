import { Injectable, Injector } from '@angular/core';
import { GlobalService } from './core/global.service';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';
import { Constant } from '../shared/constant';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { RSA_NO_PADDING } from 'constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MassloadService  {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  apiBase:string="https://app.sanchezpolo.com:8443/TspApi/api";
  constructor(injector: Injector, private globalService: GlobalService, private config:ConfigService) { 
    this.apiBase=config.getConfig().massLoadApi;
  }
    

  sendOrders(data:any) {
    return this.globalService.post(this.apiBase+Constant.Endpoints.MASSLOAD.POST_ORDERS,data,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: ''
      }),
      responseType: ''
    }).pipe(
      map(res => {
  
        return res;
      },(err:any) => {
        return  err;
      }),catchError((err:any)=>{
        return throwError (err);
      })
    );
 }
}
