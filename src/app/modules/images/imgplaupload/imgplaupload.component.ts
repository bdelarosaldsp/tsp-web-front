import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxDropzoneComponent, NgxDropzoneImagePreviewComponent } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';
import { CumImage } from 'src/app/models/cum-image';
import { CumImagesService } from 'src/app/services/cum-images.service';
import { Constant } from 'src/app/shared/constant';
import Swal from 'sweetalert2';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AgencyModalComponent } from '../../shared/modals/agency-modal/agency-modal.component';
import { ImgDialogComponent } from '../img-dialog/img-dialog.component';
import { Client } from 'src/app/models/client';
import { Observable, map } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-imgplaupload',
  templateUrl: './imgplaupload.component.html',
  styleUrls: ['./imgplaupload.component.scss']
})
export class ImgplauploadComponent implements OnInit {
  @ViewChild(NgxDropzoneComponent) panel: NgxDropzoneComponent;
  controlDoc : FormControl  = new FormControl('', [Validators.required])
  controlRem : FormControl  = new FormControl('')
  controlFac : FormControl  = new FormControl('')
  controlImg : FormControl  = new FormControl('AMBOS')
  controlTipoOrden : FormControl  = new FormControl('ASC')
  controlOrden : FormControl  = new FormControl('REMESA')
  control : FormControl  = new FormControl('')

  avanza:boolean;
  count :number=0;

  RespuestaN:Array<any> =[];
  RespuestaS:Array<any>=[];

  dataImage:Array<any>=[];
  imgb64:  ArrayBuffer| string;
  selectedcli:string;
  user:string=Constant.AUTH.getUser()?.email;
  imgerror:Array<any>=[];
  totaldata:Array<Array<any>>=[];

  progressbar:boolean=false;
  label:string="";
  agency_id=Constant.AUTH.getAgency()?.vus_codins;
  Remimg:number=0;

  files: Array<any> = [];
  cumImages:Array<CumImage>=[];
  Remesas:Array<any>=[];
  Imagenes:Array<any>=[];
  imgprov:Array<any>=[];
  
  options: Client[];
  filteredOptions: Observable<any[]>;

  constructor(
    private toastr:ToastrService,
    private clientService:ClientsService,
    private cdr: ChangeDetectorRef,
    public dialog:MatDialog,
    private router: Router,
    private sanitizer:DomSanitizer, 
    private imgservice:CumImagesService
  ) 
  {
    this.getClients();
  }

  ngOnInit(): void {
    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }

     this.filteredOptions = this.control.valueChanges.pipe(
      map((value) => {
        const client = typeof value === 'string' ? value.toLowerCase() : value?.cliente_cod.toLowerCase();
        return this.options.filter((option)=>
          option.cliente_cod.toLowerCase().includes(client)
        );
      })
    );
  }

  onClear(){
    this.Remesas.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/images/uploadpla']);
    });
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

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }

  GetPlanilla(){
    this.progressbar=true;
    let planilla:string =this.controlDoc.value;
    let data ={
      planilla:planilla,
      remesa:this.controlRem.value==null?"":this.controlRem.value,
      factura:this.controlFac.value==null?"":this.controlFac.value,
      cliente:this.selectedcli==null?"":this.selectedcli,
      conimg:this.controlImg.value==null?"":this.controlImg.value,
      orden:this.controlOrden.value +" "+ this.controlTipoOrden.value,
    };
    this.imgservice.getRemesasOtmPla(data).subscribe(
      {
        next:(res)=>{
          if(res.data.message==='OK'){
            if (res.data.remesas[0].instal!==this.agency_id) {
              Swal.fire({
                title:"Planilla de otra agencia",
                text:"Debe cambiar la agencia seleccionada",
                icon: "info"
              }).then((res)=>{
                const dialogRef = this.dialog.open(AgencyModalComponent, {
                  width: '400px',
                  data : {}
                });
                dialogRef.afterClosed().subscribe((result) => {
                  
                  this.agency_id = JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.agency)!);
                  this.cdr.detectChanges();
                  this.onClear()
                });
              })
            }
            this.progressbar=false;
            this.Remesas=res.data.remesas;
            this.Remimg=res.data.imgpla;
            this.label="";
            this.cdr.detectChanges();
          }else{
            this.progressbar=false;
            this.label="";
            this.cdr.detectChanges();
            Swal.fire({
              text:res.data.message,
              icon:'info'
            });
          }
        }
      }
    )
    this.label="Obteniendo detalles de planilla";
  }

  getImgRemesa(relacion:string){
    this.imgservice.getImages('10',4,relacion).subscribe(
      {
        next:(res)=>{
          let elementIndex = this.Remesas.findIndex((obj => obj.remesa === relacion.split("-")[1] && obj.planilla ===relacion.split("-")[0] && obj.factura ===relacion.split("-")[2]));
          this.Remesas[elementIndex].imagenes = res.data.images;
          console.log(res)
        },complete:()=>{
          this.cdr.detectChanges();
        }
      }
    )
  }
  
   imgRem(relacion:string):number{
    
    let res: number=0;
    var remfac=relacion.split("-");
    if (this.cumImages.length>0) {
        this.cumImages.forEach(element => {
          
         if(element.remesa===remfac[0] && element.document===remfac[1]) {
           res=res+1;
         }
       });
    }
    return res;
  }

  onSelect(event:any,relacion:string,cliente:string,cuenta:number) {
    
    let Respuesta:string="";
    let comentario:string="";
    let limpiar:Array<number>=[];
    let cont:number=0;
    let length:number=event.addedFiles.length;

    event.addedFiles.forEach(async (element:any) => {
      var index=event.addedFiles.indexOf(element);
      var remfac=relacion.split("-");
      
      let data: any={
        'documento':remfac[1],
        'remesa':remfac[0],
        'planilla':this.controlDoc.value,
        'client_id':cliente,
        'company':'LDSP',
        'agency_id':this.agency_id,
        'filename':element.name,
        'option':3
      };
      
      await this.imgservice.valFac(data).subscribe( {
        next:(res:any)=>{
          
          let imgcum:CumImage={
            planilla:this.controlDoc.value,
            remesa:remfac[0],
            filename:element.name,
            client_id:+cliente,
            url:'',
            agency_id:this.agency_id,
            company:'LDSP',
            file:element,
            document:remfac[1]
          }
          comentario=res.data.message;
          if (comentario==='Factura confirmada') {
            this.RespuestaS.push({relacion:relacion,image:element.name,respuesta:comentario});
            this.cumImages.push(imgcum);
          }else{
            this.RespuestaN.push({relacion:relacion,image:element.name,respuesta:comentario});
            limpiar.push(index);
          }
          
        },
        error:(err)=>{

        },
        complete:()=>{
          cont=cont+1;
          console.log("cont:"+cont+ " len:"+length)
          if (cont===length) {
            Respuesta="";
            this.RespuestaS.forEach(ok => {
              Respuesta=Respuesta+ok.image +'-'+ ok.respuesta +"\n";
            });
            Respuesta!==""?this.toastr.success(Respuesta):"";

            Respuesta="";
            this.RespuestaN.forEach(err => {
              Respuesta=Respuesta+err.image +'-'+ err.respuesta +"\n";
            });
            Respuesta!==""?this.toastr.warning(Respuesta):"";
          }         

          this.cdr.detectChanges();
        }
      });

      if(limpiar.length>0){
        limpiar.forEach(lim => {
          this.cumImages.splice(lim,1);
        });
      }
      
    });
    
    
    
    //console.log(this.RespuestaS)
    this.files.push({relacion:relacion,imagenes:event.addedFiles});
    this.cdr.detectChanges();
  }

  openImages(relacion:string){
    var remfac=relacion.split("-");
    let imagenes: Array<any>=[];
    if (this.cumImages.length>0) {
        this.cumImages.forEach(element => {
          
          if(element.remesa===remfac[0] && element.document===remfac[1]) {
            const file = element.file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imgb64=reader.result!;
              let data={
                name:file.name,
                fecha_imagen:file.lastModified,
                content:this.imgb64
              }
              imagenes.push(data);
            }
          }
       });

      const dialogRef = this.dialog.open(ImgDialogComponent, {
        width: '70vw',
        height:'70vh',
        data:{'remesa':remfac[0],'factura':remfac[1],'imagenes':imagenes}
      });

    }
  }

  uploadImages():void{

    if(this.cumImages.length>0){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data:{'cntprecarga':this.cumImages.length,'cntcarga':this.cumImages.length,'cntdif':this.cumImages.length-this.cumImages.length}
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
                      'remesa':x.remesa,
                      'planilla':x.planilla,
                      'company': x.company,
                      'agency_id':x.agency_id,
                      'url': x.url,
                      'image':this.imgb64.toString(),
                      'option':2
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
}
