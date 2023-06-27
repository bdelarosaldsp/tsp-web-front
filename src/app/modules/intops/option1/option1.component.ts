import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { PassingdataService } from 'src/app/services/passingdata.service';
import { Constant } from 'src/app/shared/constant';

export let browserRefresh= false;

@Component({
  selector: 'app-option1',
  templateUrl: './option1.component.html',
  styleUrls: ['./option1.component.scss']
})
export class Option1Component implements OnInit {

  UrlBase:string;
  UrlChild:string
  Usuario:string;
  Uid:string;
  Sucursal:string;
  Agencia :string;
  Multiagencia:string;
  subscription:Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private passingdata: PassingdataService ,
    private router:Router,
    private toastr:ToastrService,config:ConfigService) {
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
         
        }
      });
      this.UrlBase=config.getConfig().intSiteUrl;
    }

  ngOnInit(): void {

    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }
    //this.UrlBase=environment.phpSiteUrl;
    this.UrlChild=this.passingdata.GetUrl();
    
    console.log(this.UrlChild)
    if(this.UrlChild==''){
      this.UrlChild=localStorage.getItem('Option')?.toString()||'';
    }else{
      localStorage.setItem('Option',this.UrlChild);
    }
    //this.UrlChild= this.UrlChild.substring(2,this.UrlChild.length);
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codage;
    this.Agencia ="&agencia=" + Constant.AUTH.getAgency()?.vus_codins;
    this.Uid="&uid="+ Constant.AUTH.getUser()?.id;
    this.Multiagencia="&ca="+ (Constant.AUTH.getUser()?.agencies.length>1?'S':'N');

    
  }

  getUrl()
  {
    console.log(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid+this.Multiagencia)
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid+this.Multiagencia);
  }


}
