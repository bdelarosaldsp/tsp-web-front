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
import { groupBy, map, Observable, of, startWith } from 'rxjs';
import { Constant } from 'src/app/shared/constant';
import { Router } from '@angular/router';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { PdfviewerComponent } from '../pdfviewer/pdfviewer.component';
import { ImgpreviewComponent } from '../imgpreview/imgpreview.component';


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
  otm:boolean=Constant.AUTH.getAgency()?.otm?.activo=='S'? true: false;
  progressbar:boolean=false;
  count :number=0;
  dataImage:Array<any>=[];
  imgb64:  ArrayBuffer| string;
  user:string=Constant.AUTH.getUser()?.email;
  imgerror:Array<any>=[];
  totaldata:Array<Array<any>>=[];

  options: Client[];
  filteredOptions: Observable<any[]>;

  constructor(
    private clientService:ClientsService,
    private sanitizer:DomSanitizer, 
    public dialog:MatDialog,
    private toastr:ToastrService,
    private imgservice:CumImagesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.getClients();
    
  }

  ngOnInit(): void {
    console.log(Constant.AUTH.getAgency())
    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }
    // if (this.otm){
    //   this.router.navigate(['/images/uploadotm']);
    // }
    
    this.filteredOptions = this.control.valueChanges.pipe(
      map((value) => {
        const client = typeof value === 'string' ? value.toLowerCase() : value?.cliente_cod.toLowerCase();
        return this.options.filter((option)=>
          option.cliente_cod.toLowerCase().includes(client)
        );
      })
    );

  }

  getClients(){
  
    this.clientService.getClients(Constant.AUTH.getUser()?.email).subscribe(
      res => {
        this.options = res.data;
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
              let date=new Date();
              const ficaso='IMG' + date.getDay()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds();
              console.log(ficaso);
              this.cumImages.forEach(x=>{
      
                const file = x.file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  this.imgb64=reader.result!;
      
                  let data: any
                  /*if(this.otm){
                    var remfac= x.document.split("(", 2); */
                   data={
                      'user':this.user,
                      'filename': x.filename,
                      'client_id':x.client_id.toString(),
                      'document':x.document,
                      'company': x.company,
                      'agency_id':x.agency_id,
                      'url': x.url,
                      'image':this.imgb64.toString(),
                      'size':x.file.size,
                      'type':x.file.type.split('/')[1],
                      'option':1
                    };
                  //}
                  
                  

                  this.imgservice.uploadImage(data).subscribe(
                    {
                      next: (response) => {
                        console.log(response);
                        if(response.data?.message=='Imagen guardada'){
                          let imgmail: any={
                            'user':this.user,
                            'filename': x.filename,
                            'client_id':x.client_id.toString(),
                            'document':x.document,
                            'ficaso': ficaso,
                            'sitimg':'ACEPTADA',
                            'agency_id':x.agency_id,
                          };
                          /*this.imgservice.imgMail(imgmail).subscribe({
                            next:(res)=>{
                              console.log('img aceptada');
                            }
                          });*/

                          this.dataImage.push(
                            {
                              planilla:response.data?.img?.planilla,
                              remesa:response.data?.img?.remesa,
                              factura:response.data?.img?.document,
                              cantidad:1
                            });
                          this.cdr.detectChanges();
                          this.count++;
                          
                        }else{
                          let imgmail: any={
                            'user':this.user,
                            'filename': x.filename,
                            'client_id':x.client_id.toString(),
                            'document':x.document,
                            'ficaso': ficaso,
                            'sitimg':'RECHAZADA',
                            'agency_id':x.agency_id,
                          };
                          /*this.imgservice.imgMail(imgmail).subscribe({
                            next:(res)=>{
                              console.log('img rechazada');
                            }
                          });*/

                          this.imgerror.push({'imagen':x.filename,'factura':x.document,'error':response.data?.message})
                          this.count++;
                        }
                      },
                      error: (error) => {
                        console.log(error);
                        let imgmail: any={
                          'user':this.user,
                          'filename': x.filename,
                          'client_id':x.client_id.toString(),
                          'document':x.document,
                          'ficaso': ficaso,
                          'sitimg':'RECHAZADA',
                          'agency_id':x.agency_id,
                        };
                        /*this.imgservice.imgMail(imgmail).subscribe({
                          next:(res)=>{
                            console.log('img rechazada');
                          }
                        });*/

                        this.imgerror.push({'imagen':x.filename,'factura':x.document,'error':error.data?.message})
                        this.count++;
                      },
                      complete:()=>{
                        if(this.count==this.cumImages.length){
                          this.progressbar=false;
                          this.cdr.detectChanges();
                          console.log(this.dataImage);

                          
                          this.dataImage = Object.values(this.dataImage.reduce(function(groups, item) {
                            var val = item['factura'];
                            groups[val] = groups[val] || {planilla: item.planilla, remesa: item.remesa,factura:item.factura, cantidad: 0};
                            groups[val].cantidad += item.cantidad;
                            return groups;
                          }, {}));

                          //this.totaldata.push(this.dataImage);
                          //this.totaldata.push(this.imgerror);
                          console.log(this.dataImage);


                          const dialogRef = this.dialog.open(ResultDialogComponent, {
                            width: '500px',
                            height: '500px',
                            data:this.dataImage,
                          });
                    
                          this.progressbar=false;
                          this.cdr.detectChanges();

                          dialogRef.afterClosed().subscribe(
                            {
                              complete: () => {
                                
                                if(this.imgerror.length==0){
                                  this.toastr.success('Imagenes cargadas satisfactoriamente','Cargue total exitoso');
                                }else{
                                  this.toastr.warning('Imagenes cargadas satisfactoriamente','Cargue parcial exitoso');
                                }
                                this.onClear();
                              }
                            });
                            
                          /*this.imgservice.getSendMail(this.agency_id,this.selectedcli,this.user,ficaso).subscribe({
                            next:(res)=>{
                              if(res.data.message=='Correo enviado'){
                                this.toastr.success('Se envió mail de validación','Correo enviado');
                                
                              }
                            }
                          });*/

                          
                        }
                      }
                    });
                };
              });    
            }
          }
        }
        
      );

      
      

    }else
    {
      this.toastr.warning('No hay imagenes listas para cargar','Sin facturas');
    }
    
  }
  
  previewImage(image:File){


    if(image.name.includes('pdf') || image.name.includes('pdf') ){
      return "./assets/media/icons/pdficon.png";
    }else{
      const objectURL = URL.createObjectURL(image);
    
      return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    }
  }

  carrousel(image:File){
    if(image.name.includes('pdf') || image.name.includes('pdf') ){

      
      const dialogRef = this.dialog.open(PdfviewerComponent, {
      
        minHeight:'100vh',
        minWidth:'100vw',
        data: image //this.covertB64PDf(content)
      });
    }else{
      let images: Array<any>=[];
      this.files.forEach(element => {

        const objectURL = URL.createObjectURL(element);
       
        let file={

          'name': element.name,
          'planilla': '',
          'remesa':'',
          'fecha_imagen':'',
          'content':  this.sanitizer.bypassSecurityTrustResourceUrl(objectURL)
        }
        images.push(file);
      });
      const dialogRef = this.dialog.open(ImgpreviewComponent, {
      
        minHeight:'100vh',
        minWidth:'100vw',
        data:images
      });
    }
    
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
      this.router.navigate(['/images/upload']);
  });
  }

  validateDocument(image:File, id:string, factura:string){
    if(factura !=='' || typeof(factura) !=='undefined'){

      
      
      (document.getElementById('sp_'+image.name) as HTMLSpanElement).hidden=true;
      (document.getElementById('sp2_'+image.name) as HTMLSpanElement).hidden=false;

      let count: Number=0;
      let message:string='';
      this.setClient();
      let data: any={
        'documento':factura,
        'cliente':this.selectedcli,
        'company':'LDSP',
        'agency_id':this.agency_id,
        'filename':image.name,
        'option':1
      };
      console.log('size:'+image.size+',extention:'+image.type)

      this.imgservice.valFac(data).subscribe(res=>{
        count= +res.data?.cant;
        message=res.data?.message;
        if(count>0){
          (document.getElementById(id) as HTMLInputElement).disabled = true;
          (document.getElementById('btn_'+id) as HTMLButtonElement).hidden = true;
          (document.getElementById('spn_'+id) as HTMLButtonElement).hidden=false;

          this.setClient();

          let imgcum:CumImage={
            planilla:'',
            remesa:'',
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

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }
}
