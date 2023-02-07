import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  Agencia :string;

  constructor(
    private sanitizer: DomSanitizer,
    private passingdata: PassingdataService ,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {

    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }
    this.UrlBase=environment.phpSiteUrl;
    this.UrlChild=this.passingdata.GetUrl();
    
    this.UrlChild= this.UrlChild.substring(2,this.UrlChild.length);
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codins;
    this.Agencia ="&agencia=" + Constant.AUTH.getAgency()?.vus_codage;
    
  }

  getUrl()
  {
    console.log(Constant.AUTH.getAgency());
    console.log(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia);
  }

}
