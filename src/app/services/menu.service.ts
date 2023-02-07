import { Injectable, Injector } from '@angular/core';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService{

  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.GET_MENUS.GET_ACTIVES, injector);
   }

  
}

