import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
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
  Uid:string;
  Sucursal:string;
  Agencia :string;
  Multiagencia:string;
  ipAddress:string;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private passingdata: PassingdataService ,
    private router:Router,
    private toastr:ToastrService,
    private http:HttpClient,
    config:ConfigService,
    ) {
    
      this.UrlBase=config.getConfig().phpSiteUrl;
      this.getIPAddress();
    }

  ngOnInit() {

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
    this.Uid="&uid="+ Constant.AUTH.getUser()?.id;
    this.Multiagencia="&ca="+ (Constant.AUTH.getUser()?.agencies.length>1?'S':'N');
    this.ipAddress=this.getIPAddress();
    this.ipAddress="&vars={ip:"+this.ipAddress+",usuario:"+this.Usuario.replace("?","")+",sucursal:"+this.Sucursal.replace("&","")+"}"
  }

  getUrl()
  {
    console.log(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid+this.Multiagencia+this.ipAddress)
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid+this.Multiagencia+this.ipAddress);
  }
  getIPAddress():string
  {
    let ip:string="";
    this.http.get("https://api-bdc.net/data/client-ip").subscribe((res:any)=>
      {
        ip=res.ipString
                localStorage.setItem("IpClient",ip);
      }
    );
    ip=localStorage.getItem("IpClient")||"";
    console.log(ip)
    return ip;
  }

}
