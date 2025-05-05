import { Injectable, Injector } from '@angular/core';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';
import { ConfigService } from './config.service';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService{

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.GET_MENUS.BASE, injector);
  }

  public getMenuFromUser(user_menus:any):any[]{
    let menus:Array<any>=[];

    user_menus.forEach((item:any)  => {
      menus.push(item?.menus[0]);
    });

    menus.sort((a, b) => a.categoria.localeCompare(b.categoria));
    return menus;
  }

  public CreateMenu(data: any): Observable<any> {
      return this.globalService
        .post(`${this.urlBase}/actions/CreateMenu`, data)
        .pipe(
          map(res => {
            return res;
          })
        );
    }
}

