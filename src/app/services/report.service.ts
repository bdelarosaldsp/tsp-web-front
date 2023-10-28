import { Injectable, Injector } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';
import { Constant } from '../shared/constant';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService{

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.REPORTS.BASE, injector);
  }

  public GetTransmisiones(objeto_id:string,trm_estado:string){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.REPORTS.GET_TRANSMISIONES}/${objeto_id}/${trm_estado}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public GetTransmisionesProcesos(){
    return this.globalService.get(`${this.urlBase}${Constant.Endpoints.REPORTS.GET_PROCESOS}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }
}
