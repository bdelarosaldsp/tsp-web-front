import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Constant } from '../shared/constant';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class CumImagesService extends BaseService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(injector: Injector) {
    super(Constant.Endpoints.CUM_IMAGES.BASE, injector);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  valFac(data:any) {
    this.isLoadingSubject.next(true);
    return this.globalService.post(Constant.Endpoints.CUM_IMAGES.GET_FACTURA,data).pipe(
      map(res => {
        
        this.isLoadingSubject.next(false);
        return res;
      },(err:any) => {
        
        this.isLoadingSubject.next(true)
        return  err;
      }),catchError((err:any)=>{
        
        this.isLoadingSubject.next(true)
        return throwError (err);
      })
    );
 }

 uploadImage(data:any) {

  return this.globalService.post(Constant.Endpoints.CUM_IMAGES.UPLOAD,data).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

}
