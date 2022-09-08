import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PassingdataService } from 'src/app/services/passingdata.service';
import { Constant } from 'src/app/shared/constant';
import { environment } from '../../../../../../environments/environment';


@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.version;
  appPreviewChangelogUrl: string = '';
  categorie : string ='';
  Pmenu:Menu={title:'Reportes',
  svg: './assets/media/icons/duotune/communication/com012.svg',
  hasChild:true, link:'/dashboard', subMenus:[]};
  menus : Array<Menu> =[]; 
    //{title:'Imagenes',  svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:true, link:'', 
      //subMenus:[
        //{title:'Cargue de imagenes', svg: '', hasChild:false, link:'/images/upload', subMenus:[]},
        //{title:'Consulta de imagenes', svg: '', hasChild:false, link:'/images/search', subMenus:[]},
      //] },
    /*{
      title:'Reportes', svg: './assets/media/icons/duotune/general/gen022.svg', hasChild:true, link:'', 
        subMenus: [
          {title:'Reporte 1', svg: '', hasChild:false, link:'/report/report1', subMenus:[]},
          {title:'Reporte 2', svg: '', hasChild:false, link:'/report/report2', subMenus:[]},
      ] },*/

    //];

    
  constructor(private menuService :MenuService, private router :Router, private passingdata: PassingdataService) {
    
  }
  
  ngOnInit(): void {

    if (this.menus.length==0){
      
     this.menus=this.GetMenus();
    }

  }

  GetMenus() : Array<Menu>{
    let MenuTot:Array<Menu>=[
      {title:'Inicio', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'/', subMenus:[] },
      {title:'Apps Net', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'/appsnet', subMenus:[] },
      {title:'Reportes', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:false, link:'/', subMenus:[]}
    ];
    var email=Constant.AUTH.getUser()?.email;
    this.menuService.getByVal('PHP', email.toUpperCase()).subscribe(
      res => {
        for (var x of res.data) {
          if (x.categoria != this.categorie){
            let Smenu:Menu={title:x.categoria,svg:'',hasChild:true,link:'/',subMenus:[{
              title:x.menu,svg:'',hasChild:false,link:x.url,subMenus:[]
            }]};
            this.categorie=x.categoria;
            this.menus[2].hasChild=true;
            this.menus[2].subMenus.push(Smenu);
          }         
        }
        //MenuTot.push(this.Pmenu);
        //this.ngOnInit();
      });
      
      this.reloadComponent();
      return MenuTot;
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });

  }

  sendData(url:string){
    localStorage.setItem('ReportUrl',url);
  }
}
export interface Menu {
  title: string,
  svg : string,
  hasChild : boolean,
  link : string,
  subMenus : Array<Menu>

  }