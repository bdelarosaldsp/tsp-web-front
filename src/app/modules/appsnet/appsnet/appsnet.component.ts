import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';
import { Constant } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';
import {Subscription} from 'rxjs'

export let browserRefresh= false;
@Component({
  selector: 'app-appsnet',
  templateUrl: './appsnet.component.html',
  styleUrls: ['./appsnet.component.scss']
})
export class AppsnetComponent implements OnInit {

  subscription:Subscription;
  UrlBase:string;
  Usuario:string;
  Sucursal:string;

  constructor(private sanitizer: DomSanitizer, private toastr:ToastrService, private router: Router,config:ConfigService) {
    
      this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
          console.log(browserRefresh)
        }
      });
    
    this.UrlBase=config.getConfig().netSiteUrl;
  }

  ngOnInit(): void {
    
    //this.UrlBase=environment.netSiteUrl;
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    var x=Constant.AUTH.getAgency();
    console.log(x);

    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }else{
      
      this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codage;
    }
    
  }

  getUrl()
  {
    console.log(this.Sucursal);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.Usuario+this.Sucursal);
  }

}
