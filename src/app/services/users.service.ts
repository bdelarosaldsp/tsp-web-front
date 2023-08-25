import { Injectable, Injector } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService{
  constructor(injector: Injector,config:ConfigService) {
    let apiBase:string;
    apiBase=config.getConfig().apiUrl;
    super(apiBase+Constant.Endpoints.USERS.BASE, injector);
  }

  public Disable2fa(email :string) {
    return this.globalService.get(`${this.urlBase}/actions/Disable2fa/${email}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public LogoutUser(email :string) {
    return this.globalService.get(`${this.urlBase}/actions/LogoutUser/${email}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public LogoutAll() {
    return this.globalService.get(`${this.urlBase}/actions/LogoutAll`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public DeleteUser(email :string) {
    return this.globalService.get(`${this.urlBase}/actions/DeleteUser/${email}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }

  public ChangePass(email :string,pass:string) {
    return this.globalService.get(`${this.urlBase}/actions/ChangePass/${email}/${pass}`).pipe(
      map(res => {
        
       return res;
      })
    );
  }
  
  public ChangeImg(data: any): Observable<any> {
    return this.globalService
      .post(`${this.urlBase}/actions/ChangeImg`, data)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
