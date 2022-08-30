import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Constant } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appsnet',
  templateUrl: './appsnet.component.html',
  styleUrls: ['./appsnet.component.scss']
})
export class AppsnetComponent implements OnInit {

  UrlBase:string;
  Usuario:string;
  Sucursal:string;

  constructor(private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    
    this.UrlBase=environment.netSiteUrl;
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codinsS;
    
  }

  getUrl()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.Usuario+this.Sucursal);
  }

}
