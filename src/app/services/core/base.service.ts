import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GlobalService } from 'src/app/services/core/global.service';
/* @Injectable({
  providedIn: 'root'
}) */
export class BaseService {
  public urlBase = '';
  public globalService: GlobalService;
  constructor(urlBase: string, injector: Injector) {
    this.globalService = injector.get(GlobalService);
    this.urlBase = urlBase;
  }

  public get() {
    console.log('aqui servicio');
    return this.globalService.get(this.urlBase).pipe(
      map(res => {
       return res;
      })
    );
  }
  public getActives() {
    console.log(this.urlBase);
    return this.globalService.get(this.urlBase+'/actions/GetActives').pipe(
      map(res => {
        
       return res;
      })
    );
  }
  public getById(id : number) {
    return this.globalService.get(`${this.urlBase}/${id}`).pipe(
      map(res => {
       return res;
      })
    );
  }
  public getPublic() {
    return this.globalService.get(`${this.urlBase}/get/public`).pipe(
      map(res => {
       return res;
      })
    );
  }
  
  public post (data : any): Observable<any> {

    return this.globalService
      .post(this.urlBase, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public put (data : any): Observable<any> {

    return this.globalService
      .put(`${this.urlBase}/${data.id}`, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public delete (data : any): Observable<any> {

    return this.globalService
      .delete(`${this.urlBase}/${data.id}`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public activate(data: any) {
    return this.globalService
      .post(`${this.urlBase}/activate`, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
  public deactivate(data : any) {
    return this.globalService
      .post(`${this.urlBase}/deactivate`, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
