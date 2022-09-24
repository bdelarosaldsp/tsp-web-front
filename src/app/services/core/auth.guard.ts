import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { Account } from 'src/app/models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  /* public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }  */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (this.authService.isLoggedIn()) {
      const user : Account = this.authService.getLocaUser();
      if (user?.google2fa_enable == false ) {
        this.router.navigate(['/auth/twofactoryactivate']);
        return of(false);
      }
      return of(true);
    }
    this.router.navigate(['/auth/login']);
   
    
    return of(false);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.canActivate(route, state)) {
      return true;
    }
    return false;
    //return this.canActivate(route, state);
  }

  private checkLogin(url: string) {
    if (this.authService.isLoggedIn()) {
      return true;
    }
  }
}
