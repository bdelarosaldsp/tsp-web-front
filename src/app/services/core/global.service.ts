import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constant } from 'src/app/shared/constant';

import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private httpOptions;
  public ActualCountry = 103;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
        responseType: ''
      }),
      responseType: ''
    };
  }

  /**
   * @description Manejo de errores en las peticiones.
   */
  private handleError(error: HttpErrorResponse) {


    const stylesLogErrors = `
      background: linear-gradient(#a30b34, #571402);
      border: 1px solid #3E0E02;
      color: white;
      display: block;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.4) inset,
        0 5px 3px -5px rgba(0, 0, 0, 0.5),
        0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset;
      text-align: center;
      font-weight: bold;
    `;

    if (!Constant.PRODUCTION) {
      // console.log(`%c handleError %c ${window['emoticons'].bomb}`, stylesLogErrors, 'padding-left: 10px; font-size: 20px;');
      // console.log('%c End HandleError', stylesLogErrors);
    }
    const errors = [];
    
    if (error.error?.errors) {
      for (var key in error.error.errors) {
        errors.push(error.error.errors[key]);
      }
    }
    
    return throwError({
      code: error.statusText,
      message: error.message

              ? error.message
        : error.error.message
        ? error.error.message
        : error.error.message,
      handleError: true,
      error: error.error,
      originalerrors: error.error?.errors? error.error?.errors :  error.error?.data?.errors ,
      errors: errors
    });
  }

  /**
   * @description Optener token de autententication
   * @returns String
   */
  getToken(): string {
    let token = Constant.AUTH.getToken();
    return token? token : '';
  }
  getUser(): string {
    return Constant.AUTH.getUser();
  }
  /**
   * @description Optener cabecera por defecto
   * @return HttpHeaders {any}
   */
  getHeader() {
    const token = 'Bearer ' + this.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
        responseType: ''
      }),
      responseType: ''
    };
    return this.httpOptions;
  }

  getFileHeaders() {
    const token = 'Bearer ' + this.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
        responseType: 'Blob'
      }),
      responseType: 'blob'
    };
   
    return this.httpOptions;
  }

  /**
   * @description Peticiones por el metodo post
   * @param url string
   * @param data Object
   * @param header? HttpHeaders
   * @return Observable
   */
  post(url: string, data: any, headerOptions?: any): Observable<any> {
    return this.http
      .post(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }
  postFile(url: string, data: any, headerOptions?: any): Observable<any> {
    return this.http.post(
      url,
      data,
      headerOptions ? headerOptions : this.getHeader()
    );
  }

  /**
   * @description Peticiones por el metodo GET
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  get(url: string, headerOptions?: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getToken()
      })
      

    };
    
    return this.http
      .get(url, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo PUT
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  put(url: string, data?: any, headerOptions?: any): Observable<any> {
    return this.http
      .put(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo DEL
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  delete(url: string, headerOptions?: any): Observable<any> {
      return this.http
      .delete(url, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }
}
