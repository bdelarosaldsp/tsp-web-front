import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { PassingdataService } from 'src/app/services/passingdata.service';
import { Constant } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.scss']
})
export class Report2Component implements OnInit {
  UrlBase:string;
  UrlChild:string
  Usuario:string;
  Uid:string;
  Sucursal:string;
  Agencia :string;

  constructor(
    private sanitizer: DomSanitizer,
    private passingdata: PassingdataService ,
    private router:Router,
    private toastr:ToastrService,config:ConfigService) {
    
      this.UrlBase=config.getConfig().phpSiteUrl; 
    }

  ngOnInit(): void {

    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }

    //this.UrlBase=environment.phpSiteUrl;
    this.UrlChild=this.passingdata.GetUrl();
    this.UrlChild= this.UrlChild.substring(2,this.UrlChild.length);
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codins;
    this.Agencia ="&agencia=" + Constant.AUTH.getAgency()?.vus_codage;
    this.Uid="&uid=" + Constant.AUTH.getUser()?.id;
    
  }

  getUrl()
  {
    console.log(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Uid);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid);
  }


}
