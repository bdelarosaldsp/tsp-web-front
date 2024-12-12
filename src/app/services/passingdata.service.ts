import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as env from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PassingdataService {

  private Url :ReplaySubject<string> = new ReplaySubject<string>();

  public urls:Observable<string>= this.Url.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

  public setUrl(url:string) :void{
    this.Url.next(url);
  }

  public GetUrl(): string{
    let UrlRet :string="";
    this.Url.subscribe(data=>{
      UrlRet=data;
      return UrlRet;
    });
    return UrlRet;
  }


}
