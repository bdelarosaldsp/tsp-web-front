import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Constant } from '../shared/constant';
import { ConfigService } from './config.service';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class CumImagesService extends BaseService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  apiBase:string;
  constructor(injector: Injector,config:ConfigService) {
    
    
    super(config.getConfig().apiUrl+Constant.Endpoints.CUM_IMAGES.BASE, injector);
    this.apiBase=config.getConfig().apiUrl;
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  valFac(data:any) {
    this.isLoadingSubject.next(true);
    return this.globalService.post(this.apiBase+Constant.Endpoints.CUM_IMAGES.GET_FACTURA,data).pipe(
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
 async valFacAsync(data:any) {
  this.isLoadingSubject.next(true);
  let result:any= await this.globalService.post(this.apiBase+Constant.Endpoints.CUM_IMAGES.GET_FACTURA,data).pipe(
    map(res => {
      
      this.isLoadingSubject.next(false);
      
      return res;
    },(err:any) => {
      
      this.isLoadingSubject.next(true)
     
      return err;
    }),catchError((err:any)=>{
      
      this.isLoadingSubject.next(true)
      return throwError (err);
    })
  ).toPromise();
  return result;
}
 uploadImage(data:any) {

  return this.globalService.post(this.apiBase+Constant.Endpoints.CUM_IMAGES.UPLOAD,data).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

public getImages(client:string,id:number,document:string ){
  return this.globalService.get(`${this.apiBase+Constant.Endpoints.CUM_IMAGES.GET_ACTIVES}/${client}/${id}/${document}`).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

public getRemesasOtm(planilla:string ){
  return this.globalService.get(`${this.apiBase+Constant.Endpoints.CUM_IMAGES.GET_REMESAS_OTM}/${planilla}`).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

public getRemesasOtmPla(data:any){
  
  return this.globalService.post(this.apiBase+Constant.Endpoints.CUM_IMAGES.GET_REMESAS_OTM_PLA,data).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

public ValidarImagenes(planilla:string ){
  return this.globalService.get(`${this.apiBase+Constant.Endpoints.CUM_IMAGES.VALIDA_IMAGENES}/${planilla}`).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

imgMail(data:any) {

  return this.globalService.post(this.apiBase+Constant.Endpoints.CUM_IMAGES.IMG_MAIL,data).pipe(
    map(res => {

      return res;
    },(err:any) => {
      return  err;
    }),catchError((err:any)=>{
      return throwError (err);
    })
  );
}

public getSendMail(agency:string,client:string,user:string,ficaso:string ){
  return this.globalService.get(`${this.apiBase+Constant.Endpoints.CUM_IMAGES.GET_SENDMAIL}/${agency}/${client}/${user}/${ficaso}`).pipe(
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
