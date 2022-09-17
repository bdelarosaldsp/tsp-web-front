import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  Sucursal:string;

  constructor(private sanitizer: DomSanitizer,private passingdata: PassingdataService ,private router:Router) { }

  ngOnInit(): void {
    this.UrlBase=environment.phpSiteUrl;
    this.UrlChild=this.passingdata.GetUrl();
    console.log(this.UrlChild);
    this.UrlChild= this.UrlChild.substring(2,this.UrlChild.length);
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codins;
    
    /*this.passingdata.Data.subscribe(data=>{
      localStorage.setItem('ReportUrl',data);
    });*/
    
    
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });

  }

  getUrl()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal);
  }


}
