
 import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from "../../shared/constant";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from "@angular/router";



@Injectable({
  providedIn: "root"
})

@Injectable()
export class RoleGuard implements CanActivate{

  constructor(private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    let r = false;
    if (!user) {
      this._router.navigate(['/auth']);
      return false;
    }
    user.roles.forEach((rol:any) => {
      if (rol.roletype_id == next.data.userType_id && rol.active == true && rol.pivot.active == true) {
        r = true;
      }
    });
    if (!r) {
      this._router.navigate(['/']);

    }
    return r;


  }





}
 