import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends BaseService {
  http: any;

  constructor(injector: Injector, config:ConfigService) {
      let apiBase:string;
      apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.GENERALES.BASE, injector);
  }

  public getMantenimiento(option:string,agency_id:string,user:string ){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.GENERALES.GET_MANTENIMIENTO}/${option}/${agency_id}/${user}`).pipe(
      map(res => {
  
        return res;
      },(err:any) => {
        return  err;
      }),catchError((err:any)=>{
        return throwError (err);
      })
    );
  }
  public getAlmacenes( ){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.GENERALES.GET_ALMACENES}`).pipe(
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
