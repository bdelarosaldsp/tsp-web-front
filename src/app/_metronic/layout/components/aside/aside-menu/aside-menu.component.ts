import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  menus : Array<Menu> =[]; 
    

    
  constructor(private menuService :MenuService, 
    private router :Router,
    private passingdata: PassingdataService,
    private cdr:ChangeDetectorRef) {
    
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
      {title:'Reportes', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:false, link:'/', subMenus:[]},
      //{title:'Cumplidos',svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:true, link:'/', 
      //subMenus:[{title:'Cargue de imagenes', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:false, link:'/images', subMenus:[]}]}
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
            this.cdr.detectChanges();
          }         
        }
      });
    
      this.menuService.getByVal('ANG', email.toUpperCase()).subscribe(
        res => {
          for (var x of res.data) {
            if (x.categoria != this.categorie){
              let Smenu:Menu={title:x.categoria,svg:'./assets/media/icons/duotune/communication/com012.svg',hasChild:true,link:'/',subMenus:[{
                title:x.menu,svg:'',hasChild:false,link:x.url,subMenus:[]
              }]};
              this.categorie=x.categoria;
              //this.menus[2].hasChild=true;
              this.menus.push(Smenu);
              this.cdr.detectChanges();
            }         
          }
        });
    
      return MenuTot;
  }


  sendData(url:string){
    this.passingdata.setUrl(url);
    if(url.includes('php') || url.includes('PHP')){
      if(this.router.url=='/report' || this.router.url=='/report/report1'){
        this.router.navigate(['/report/report2']);
      }else{
        this.router.navigate(['/report']);
      }
    }
    
    
  }
}
export interface Menu {
  title: string,
  svg : string,
  hasChild : boolean,
  link : string,
  subMenus : Array<Menu>

  }