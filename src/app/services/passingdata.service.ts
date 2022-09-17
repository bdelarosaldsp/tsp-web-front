import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingdataService {

  private Url :ReplaySubject<string> = new ReplaySubject<string>();

  public urls:Observable<string>= this.Url.asObservable();

  constructor() { }

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
