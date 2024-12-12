import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends BaseService{
  
  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.CLIENTS.BASE, injector);
  }

  public getClients(email :string) {
    return this.globalService.get(`${this.urlBase}/actions/GetActives/${email}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }
}
