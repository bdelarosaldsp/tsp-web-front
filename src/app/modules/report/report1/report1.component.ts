import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PassingdataService } from 'src/app/services/passingdata.service';
import { Constant } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})

export class Report1Component implements OnInit {

  UrlBase:string;
  UrlChild:string
  Usuario:string;
  Sucursal:string;

  constructor(private sanitizer: DomSanitizer,private passingdata: PassingdataService ) { }

  ngOnInit(): void {
    this.UrlBase=environment.phpSiteUrl;
    this.UrlChild= localStorage.getItem('ReportUrl')?.toString()!
    this.UrlChild= this.UrlChild.substring(2,this.UrlChild.length);
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codins;
    
    /*this.passingdata.Data.subscribe(data=>{
      localStorage.setItem('ReportUrl',data);
    });*/

    
  }

  getUrl()
  {
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal);
  }

}
