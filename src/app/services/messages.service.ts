import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService{

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.MESSAGES.BASE, injector);
  }

  public getMessages(email :string) {
    return this.globalService.get(`${this.urlBase}/actions/GetActives/${email}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public ReadMessage(data:any): Observable<any> {
    console.log(this.urlBase)
    return this.globalService
      .post(`${this.urlBase+Constant.Endpoints.MESSAGES.READ_MESSAGE}`, data)
      .pipe(
        map(res => {
             return res;
        }),catchError((err:any)=>{
          return throwError (err)
        })
      );
  }

  public addMessage(data:any): Observable<any> {
    return this.globalService
      .post(`${this.urlBase+Constant.Endpoints.MESSAGES.ADD_MESSAGE}`, data)
      .pipe(
        map(res => {
             return res;
        }),catchError((err:any)=>{
          return throwError (err)
        })
      );
  }

}

