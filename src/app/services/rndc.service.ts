import { Injectable, Injector } from '@angular/core';
import { ConfigService } from './config.service';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RndcService extends BaseService {

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.RNDC.BASE, injector);
  }

  public getErrores(manifiesto:string,remesa:string,estado:string,fecha:string,sucursal:string){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.RNDC.GET_ERRORES}/${manifiesto}/${remesa}/${estado}/${fecha}/${sucursal}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public getDetalle(id:number){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.RNDC.GET_DETALLE}/${id}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public getDetalleError(id:number){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.RNDC.GET_DETALLE_ERR}/${id}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }
  public getCabeza(id:number){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.RNDC.GET_CABEZA}/${id}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public saveRegister(data: any): Observable<any> {
    return this.globalService
      .post(this.urlBase+Constant.Endpoints.RNDC.SAVE_REGISTER, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public reSend(id:string){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.RNDC.RESEND}/${id}/`).pipe(
      map(res => {
        
       return res;
      })
    );
  }
}
