import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class TrazabilityService extends BaseService{

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.TRAZABILITY.BASE, injector);
  }

  Getfacab(client:string,document:string){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.TRAZABILITY.GET_FACAB}/${client}/${document}`).pipe(
      map(res => {
       return res;
      })
    );
  }

  GetMasivo(client:string,document:string){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.TRAZABILITY.GET_MASIVO}/${client}/${document}`).pipe(
      map(res => {
       return res;
      })
    );
  }

  GetPedfac(client:string,document:string,agency:string){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.TRAZABILITY.GET_PEDFAC}/${client}/${document}/${agency}`).pipe(
      map(res => {
       return res;
      })
    );
  }

  GetOd(client:string,document:string,agency:string){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.TRAZABILITY.GET_OD}/${client}/${document}/${agency}`).pipe(
      map(res => {
       return res;
      })
    );
  }

  GetNovedades(client:string,document:string,agency:string){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.TRAZABILITY.GET_NOVEDADES}/${client}/${document}/${agency}`).pipe(
      map(res => {
       return res;
      })
    );
  }

  GetCumplidos(client:string,document:string,agency:string){
    return this.globalService.get(`${this.urlBase+Constant.Endpoints.TRAZABILITY.GET_CUMPLIDOS}/${client}/${document}/${agency}`).pipe(
      map(res => {
       return res;
      })
    );
  }
}
