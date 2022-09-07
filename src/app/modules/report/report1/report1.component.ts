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
  UrlChild:string;
  Usuario:string;
  Sucursal:string;

  constructor(private sanitizer: DomSanitizer,private pssingdata: PassingdataService ) { }

  ngOnInit(): void {

    this.UrlBase=environment.netSiteUrl;

    this.pssingdata.Data.subscribe(data =>{
      this.UrlChild= data;
    });
    
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codins;
  }

  getUrl()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.Usuario+this.Sucursal);
  }

}
