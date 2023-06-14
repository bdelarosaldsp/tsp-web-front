import { Injectable, Injector } from '@angular/core';
import { ConfigService } from './config.service';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RndcService extends BaseService {

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.RNDC.BASE, injector);
  }

  public getErrores(){
    return this.globalService.get(`${this.urlBase}/${Constant.Endpoints.RNDC.GET_ERRORES}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }
}
