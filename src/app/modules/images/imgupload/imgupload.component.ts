import { ChangeDetectorRef, Component,  Inject,  OnInit } from '@angular/core';
import { FormControl,  Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { CumImage } from 'src/app/models/cum-image';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CumImagesService } from 'src/app/services/cum-images.service';
import { groupBy, map, Observable, of } from 'rxjs';
import { Constant } from 'src/app/shared/constant';
import { Router } from '@angular/router';
import { Factura } from 'src/app/models/facturas';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';


@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.scss']
})
export class ImguploadComponent implements OnInit {

  control : FormControl  = new FormControl('', [Validators.required])
  avanza:boolean;
  clients : Array<Client>;
  selectedcli:string;
  files: Array<any> = [];
  cumImages:Array<CumImage>=[];
  agency_id:string=Constant.AUTH.getAgency()?.vus_codins;
  progressbar:boolean=false;
  count :number=0;
  dataImage:Array<any>=[];
  imgb64:  ArrayBuffer| string;

  constructor(
    private clientService:ClientsService,
    private sanitizer:DomSanitizer, 
    public dialog:MatDialog,
    private toastr:ToastrService,
    private imgservice:CumImagesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    
    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }
    this.getClients();

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
      this.selectedcli = this.control.value?.nit;
    }
    
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
    
  }
  
  uploadImages():void{

    if(this.cumImages.length>0){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data:{'cntprecarga':this.files.length,'cntcarga':this.cumImages.length,'cntdif':this.files.length-this.cumImages.length}
      });

      dialogRef.afterClosed().subscribe(
        {
          next: (response) => {
            this.avanza=response;
          },
          error: (error) => {
            // treat error
          },
          complete: () => {
            if(this.avanza){
        
              this.progressbar= true;
              this.cdr.detectChanges();
              this.cumImages.forEach(x=>{
      
                const file = x.file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  this.imgb64=reader.result!;
      
                  let data: any={
                    'filename': x.filename,
                    'client_id':x.client_id.toString(),
                    'document':x.document,
                    'company': x.company,
                    'agency_id':x.agency_id,
                    'url': x.url,
                    'image':this.imgb64.toString()
                  };
      
                  this.imgservice.uploadImage(data).subscribe(
                    {
                      next: (response) => {
                        if(response.data?.message=='Imagen guardada'){
                          /*let Res=this.dataImage.find(plarem=>plarem.factura=response.data?.img?.document)!;
                          if(!Res){*/
                            this.dataImage.push(
                              {
                                planilla:response.data?.img?.planilla,
                                remesa:response.data?.img?.remesa,
                                factura:response.data?.img?.document,
                                cantidad:1
                              }
                            );
                            this.cdr.detectChanges();
                          /*}else{
                            Res.cantidad=+1;
                            this.cdr.detectChanges();
                          }*/
                          this.count++;
                        }
                      },
                      error: (error) => {
                       console.log(error);
                      },
                      complete: () => {
                        if(this.count==this.cumImages.length)
                        {
                          this.progressbar=false;

                          this.dataImage = Object.values(this.dataImage.reduce(function(groups, item) {
                            var val = item['factura'];
                            groups[val] = groups[val] || {planilla: item.planilla, remesa: item.remesa,factura:item.factura, cantidad: 0};
                            groups[val].cantidad += item.cantidad;
                            return groups;
                          }, {}));

                          console.log(this.dataImage);
                          const dialogRef = this.dialog.open(ResultDialogComponent, {
                            width: '500px',
                            data:this.dataImage
                          });
                    
                          
                          this.progressbar=false;
                          this.cdr.detectChanges();

                          dialogRef.afterClosed().subscribe(
                            {
                              complete: () => {
                                this.onClear();
                                this.toastr.success('Imagenes cargadas satisfactoriamente','Cargue exitoso')
                              }
                            });

                          
                        }
      
                      }
                    });
                };
              });
            }
          }
        }
        
        /*result => {
        
        
      }*/);

      
      

    }else
    {
      this.toastr.warning('No hay imagenes listas para cargar','Sin facturas');
    }
    
  }
  
  previewImage(image:File){

    const objectURL = URL.createObjectURL(image);
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
  }

  onRemove(image:File) {
   
    this.files.splice(this.files.indexOf(image), 1);
    var img= this.cumImages.find(x=> x.file=image);
    if (img)
    {
      this.cumImages.splice(this.cumImages.indexOf(img),1);
    }
  }

  onClear(){
    this.files.length=0;
    this.cumImages.length=0;
    this.dataImage.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/images']);
  });
  }

  validateDocument(image:File, id:string, factura:string){
    if(factura !=='' || typeof(factura) !=='undefined'){
      
      (document.getElementById('sp_'+image.name) as HTMLSpanElement).hidden=true;
      (document.getElementById('sp2_'+image.name) as HTMLSpanElement).hidden=false;

      let count: Number=0;
      let message:string='';
      let data: any={
        'documento':factura,
        'cliente':this.selectedcli,
        'company':'LDSP',
        'agency_id':this.agency_id,
        'filename':image.name
      };

      this.imgservice.valFac(data).subscribe(res=>{
        count= +res.data?.cant;
        message=res.data?.message;
        if(count>0){
          (document.getElementById(id) as HTMLInputElement).disabled = true;
          (document.getElementById('btn_'+id) as HTMLButtonElement).hidden = true;
          //(document.getElementById('sp2_'+image.name) as HTMLSpanElement).hidden=true;
          (document.getElementById('spn_'+id) as HTMLButtonElement).hidden=false;

          let imgcum:CumImage={
            filename:image.name,
            client_id:+this.selectedcli,
            url:'',
            agency_id:this.agency_id,
            company:'LDSP',
            file:image,
            document:factura
          }

          this.cumImages.push(imgcum);
        }else if(typeof(count)){
          this.toastr.error(message,'Sin resultado');
          (document.getElementById('sp_'+image.name) as HTMLSpanElement).hidden=false;
          (document.getElementById('sp2_'+image.name) as HTMLSpanElement).hidden=true;
        }
      });
    }
  }
}
