import { Injectable, Injector } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends BaseService {

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.PEDIDOS.BASE, injector);
  }

  public validateArticles(data: any): Observable<any> {
    return this.globalService
      .post(this.urlBase+Constant.Endpoints.PEDIDOS.VAL_ARTICLES, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public createFileEnt(data: any): Observable<any> {
    return this.globalService
      .post(this.urlBase+Constant.Endpoints.PEDIDOS.IMPORT_ENTRADA, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public createFileSal(data: any): Observable<any> {
    return this.globalService
      .post(this.urlBase+Constant.Endpoints.PEDIDOS.IMPORT_SALIDA, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
