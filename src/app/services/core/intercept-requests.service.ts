import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {Constant} from './../../shared/constant';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptRequestsService {

  constructor(private router: Router, private helper: HelperService) { }

  // intercept request and add headers
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone();
   
    
    if (!request.headers.get('Authorization') || !request.headers.get('Agency')) {
      let rute = this.router.routerState.snapshot.url.split("/", 2)[1];
      //let ruta = this.router.routerState.snapshot.root['_routerState'].url.split("/", 2)[1];
      request = request.clone({
          setHeaders: { 
            'Authorization': `Bearer ${Constant.AUTH.getToken()}` ,
            'Agency' : Constant.AUTH.getAgency()?.vus_codins ?Constant.AUTH.getAgency()?.vus_codins : '' ,
        }

        });
      }
    return next.handle(request)
      .pipe(
        tap(event => {
        
          
          
          if (event instanceof HttpResponse) {
            if (!Constant.PRODUCTION && Constant.DEBUG) {
              console.log(`%cSTART HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `, 'color: green;');
              console.log(`%cHttpResponse`, 'color: green;', event);
              console.log(`%cEND HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `, 'color: green;');
            }
          }
        }, error => {
          if(error.code?.includes('Unknown Error')) {
            this.helper.onError('No hemos podido conectar con nuestro servidor de funciones, es posible que muchas cosas no funcionen');
          }
          if(error.error?.message?.includes('No se puede establecer una conexión')) {
            this.helper.onError('No hemos podido conectar con nuestro servidor de datos, es posible que muchas cosas no funcionen');
          }

          
          if (!Constant.PRODUCTION && Constant.DEBUG) {
            console.log(`%cSTART HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `, 'color: red;');
            console.error(`%cHttpResponse`, 'color: red;', error);
            console.log(`%cEND HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `, 'color: red;');
          }
          if (error.status === 404) {
            
            this.helper.onError('No confundimos, no encontramos la informacion solicitada');
           
          }
          if (error.status === 401) {
            console.log('aqui');
            const arrayruta = request.url.split('/');
            const actualruta = arrayruta[arrayruta.length - 1];
            localStorage.clear();
            
            localStorage.removeItem(Constant.AUTH.KEYS.token);
            localStorage.removeItem(Constant.AUTH.KEYS.userData);
          
            if( actualruta != 'auth') {
              console.log('aqui');
              this.router.navigateByUrl('/auth/login');
            }
           
          }
        })
      );
  }
}
