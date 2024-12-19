import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PassingdataService } from 'src/app/services/passingdata.service';
import { Constant } from 'src/app/shared/constant';
import { environment } from '../../../../../../environments/environment';
import { log } from 'console';


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
      {module:'',title:'Inicio', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'/', subMenus:[] },
      {module:'',title:'Apps Net', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'/appsnet', subMenus:[] },
      {module:'',title:'Reportes', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:false, link:'/', subMenus:[]},
      //{title:'Novasoft',svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:true, link:'/', subMenus:[]},
      //subMenus:[{title:'Cargue de imagenes', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:false, link:'/images', subMenus:[]}]}
    ];
    
    var res= this.menuService.getMenuFromUser(Constant.AUTH.getUser()?.menus);
    res.forEach(x=>{
      if (x.categoria != this.categorie){
            
        let Smenu:Menu={module:'ANG',title:x.categoria,svg:'./assets/media/icons/duotune/communication/com012.svg',hasChild:true,link:'/',subMenus:[{
          module:'ANG',title:x.menu,svg:'',hasChild:false,link:x.url,subMenus:[]
        }]};
        this.categorie=x.categoria;
        //this.menus[2].hasChild=true;
        MenuTot.push(Smenu);
        //console.log(this.menus);
        this.cdr.detectChanges();
      }else{
        
        MenuTot[MenuTot.length-1].hasChild=true;
        MenuTot[MenuTot.length-1].subMenus.push({
          module:'ANG',title:x.menu,svg:'',hasChild:false,link:x.url,subMenus:[]});
        this.cdr.detectChanges();
      }  
    })
      
    MenuTot.push({module:'ANG',title:'TSP-OTM', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:true, link:'/', subMenus:[
      {module:'ANG',title:'Cargue Masivo OTM', svg: './assets/media/icons/duotune/communication/com012.svg',hasChild:false, link:'/tsp/massload', subMenus:[]},
    ]});
    
    this.cdr.detectChanges();
    
    return MenuTot;
  }


  sendData(module:string,url:string){
    console.log(module)
    this.passingdata.setUrl(url);
    if(module.includes('php') || module.includes('PHP')){
      if(this.router.url=='/report' || this.router.url=='/report/report1'){
        this.router.navigate(['/report/report2']);
      }else{
        this.router.navigate(['/report']);
      }
    }else if(module.includes('int') || module.includes('INT')){
      if(this.router.url=='/option' || this.router.url=='/option/option1'){
        this.router.navigate(['/option/option2']);
      }else{
        this.router.navigate(['/option']);
      }
    }else{
      this.router.navigate([url])
    }
    
    
  }
}
export interface Menu {
  module:string,
  title: string,
  svg : string,
  hasChild : boolean,
  link : string,
  subMenus : Array<Menu>

  }