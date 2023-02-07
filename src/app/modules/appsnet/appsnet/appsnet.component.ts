import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private sanitizer: DomSanitizer, private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    
    this.UrlBase=environment.netSiteUrl;
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
