import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.version;
  appPreviewChangelogUrl: string = '';
  menus : Array<Menu> = [
    {title:'Inicio', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'/', subMenus:[] },
    {title:'Apps Net', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'/appsnet', subMenus:[] },
    {title:'Imagenes',  svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:true, link:'', 
      subMenus:[
        {title:'Cargue de imagenes', svg: '', hasChild:false, link:'/images/upload', subMenus:[]},
        {title:'Consulta de imagenes', svg: '', hasChild:false, link:'/images/search', subMenus:[]},
      ] },
    /*{
      title:'Reportes', svg: './assets/media/icons/duotune/general/gen022.svg', hasChild:true, link:'', 
        subMenus: [
          {title:'Reporte 1', svg: '', hasChild:false, link:'/report/report1', subMenus:[]},
          {title:'Reporte 2', svg: '', hasChild:false, link:'/report/report2', subMenus:[]},
        ] },*/
     /*  {title:'Menu2', svg: './assets/media/icons/duotune/communication/com012.svg', hasChild:false, link:'', subMenus:[] }, */
  ];
  constructor() {}

  ngOnInit(): void {}
}
export interface Menu {
  title: string,
  svg : string,
  hasChild : boolean,
  link : string,
  subMenus : Array<Menu>
  
  }