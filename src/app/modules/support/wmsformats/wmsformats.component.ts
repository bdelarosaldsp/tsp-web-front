import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-wmsformats',
  templateUrl: './wmsformats.component.html',
  styleUrls: ['./wmsformats.component.scss']
})
export class WmsformatsComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getUrl()
  {
   return this.sanitizer.bypassSecurityTrustResourceUrl("https://transportessanchezpolo-my.sharepoint.com/personal/wms_ldsp_sanchezpolo_com/_layouts/15/sharedialog.aspx?listId=58195cb9-ae1a-4c2c-b5ae-daf3acd6cd14&listItemId=17&clientId=odb&policyTip=0&folderColor=&clickTime=1712767253815&mode=manageAccess&ma=0&fullScreenMode=true&itemName=Formatos%20WMS&channelId=8ee8fe7b-8a39-45f4-96bb-7139c1c35a0a&origin=https%3A%2F%2Ftransportessanchezpolo-my.sharepoint.com");
  }
}
