import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, from, map, tap } from 'rxjs';

@Injectable()
export class ConfigService {
  
  private appConfig:any;
  constructor(private router:Router,
    private http:HttpClient) { }

  loadConfig(): Promise<any>{
    return this.http.get(this.router.url).pipe(
      map(res=>{
        return ()=>{
          if(res.toString().includes("11.0.2.5") || res.toString().includes("129.213.65.149") || res.toString().includes("localhost") ){
            console.log(res);
            return this.http
            .get('./assets/app-config-int.json').pipe(
              tap(data=>{
                this.appConfig = data;
              })
            )
            .toPromise();
            
          }else{
            console.log(res);
            return this.http
            .get('./assets/app-config-ext.json').pipe(
              tap(data=>{
                this.appConfig = data;
              })
            )
            .toPromise();
          }
        }
      }),catchError((err:any)=>{
        
        if(err.url.includes("11.0.2.5") || err.url.includes("129.213.65.149")|| err.url.includes("localhost") ){
         
          return this.http
          .get('./assets/app-config-int.json').pipe(
            tap(data=>{
              this.appConfig = data;
            })
          )
          .toPromise();
          
        }else{
          console.log(err);
          return this.http
          .get('./assets/app-config-ext.json').pipe(
            tap(data=>{
              this.appConfig = data;
            })
          )
          .toPromise();
          
        }
      })
    ).toPromise();  
    
  }

  getConfig(){
    return this.appConfig;
  }
}
