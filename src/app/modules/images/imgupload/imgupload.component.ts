import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { CumImage } from 'src/app/models/cum-image';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.scss']
})
export class ImguploadComponent implements OnInit {

  @ViewChild(ImguploadComponent) imglist: any;


  control : FormControl  = new FormControl('', [Validators.required])
  clients : Array<Client>;
  selectedcli:string;
  
  constructor(private clientService:ClientsService,private sanitizer:DomSanitizer) { }

  files: Array<any> = [];
  cumImages:Array<CumImage>=[];

  ngOnInit(): void {
    this.getClients();
    console.log(this.files);
  }

  getClients(){
  
    this.clientService.getActives().subscribe(
      res => {
        this.clients = res.data;
      }
      
    )
  }

  setClient(){

    if(!this.control.invalid){
      this.selectedcli = this.control.value?.cliente_codigo;
    }
    
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    
  }
  
  /*addImage(img:CumImage){
    this.cumImages.push(img);
  }

  removeImage(img:File){
    
    var res = this.cumImages.find(i=> i.file==img)!;
    var r =this.cumImages.indexOf(res);
    console.log(r);
    this.cumImages.splice(r,1);

  }
*/
  uploadImages():void{
    console.log(this.cumImages);

  }
  
  previewImage(image:File){
    
    const objectURL = URL.createObjectURL(image);
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
  }

  onRemove(image:File) {
   
    this.files.splice(this.files.indexOf(image), 1);
  }

  validateDocument(){

  }

  /*addCumimage(img:CumImage){
    this.cumImages.push(img);
  }*/

}
