import { Injectable, Injector } from '@angular/core';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';
import { map } from 'rxjs/operators';
import { GlobalService } from './core/global.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService{

  constructor(injector: Injector) {
    super(Constant.Endpoints.GET_MENUS.GET_ACTIVES, injector);
   }

  
}

