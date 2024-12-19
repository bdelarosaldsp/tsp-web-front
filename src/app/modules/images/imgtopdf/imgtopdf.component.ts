import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { CumImagesService } from 'src/app/services/cum-images.service';
import { Constant } from 'src/app/shared/constant';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer } from '@angular/platform-browser';

const pdfm= pdfMake;
pdfm.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-imgtopdf',
  templateUrl: './imgtopdf.component.html',
  styleUrls: ['./imgtopdf.component.scss']
})
export class ImgtopdfComponent implements OnInit {

  
  control : FormControl  = new FormControl('', [Validators.required]);
  controlDoc : FormControl  = new FormControl('', [Validators.required]);
  controlType : FormControl  = new FormControl('', [Validators.required]);
  progressbar:boolean=false;
  clients : Array<Client>;
  selectedcli:string;
  files: Array<any> = [];
  pdffiles: Array<any> = [];

  options: Client[];
  filteredOptions: Observable<any[]>;

  constructor(
    private clientService:ClientsService,
    public dialog:MatDialog,
    private sanitizer:DomSanitizer,
    private toastr:ToastrService,
    private imgservice:CumImagesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
      this.getClients();
      
  }

  ngOnInit() {

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

  getClients(){
  
    //let resCli:Array<Client>=[];
    this.clientService.getClients(Constant.AUTH.getUser()?.email).subscribe(
      {
        next:(res)=>{
          this.options = res.data;
        }
      }
      
    );
  }

  onSearch(){
    this.progressbar=true;
    this.setClient();
    this.cdr.detectChanges
    this.imgservice.getImages(this.selectedcli,4,this.controlDoc.value)
    .subscribe(
      {
        next:(response)=>{
         
          if(response.data?.message =='Busqueda completa'){
            this.files=response.data?.images;
            
          }
        },
        error:(error)=>{
          console.log(error)
         this.toastr.error(error.error.message);
        },
        complete:()=>{
         
          if(this.files.length>0){
            this.toastr.success('Busqueda completa');
            if (this.controlType.value==='2'){
              const groupByFac= this.files.reduce((group, image) => {
                const { factura } = image;
                group[factura] = group[factura] ?? [];
                group[factura].push(image);
                return group;
              }, {});
  
              
              var result =Object.entries(groupByFac);
              result.forEach((element: Array<any>) => {
                this.createPDF(element[1], element[0]);
              });
              
            }else{
              this.createPDF(this.files,this.controlDoc.value.replace(',','_'));
            }
            
          }else{
            this.toastr.warning('Sin imagenes por mostrar');
          }
         
          this.progressbar=false;
          this.cdr.detectChanges();
        }
      }
    )
  }

  setClient(){

    if(!this.control.invalid){
      this.selectedcli = this.control.value?.nit;
    }
    
  }


  onClear(){
    this.files.length=0;
    this.cdr.detectChanges();
    this.control.setValue('');
    this.controlDoc.setValue('');
    this.controlType.setValue('');
  }

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }

  private _filter(client: Client): Client[] {
    console.log(client);
    const filterValue = client.cliente_cod.toLowerCase();

    
    return this.options.filter(option => option.cliente_cod.toLowerCase().includes(filterValue));
  }
  
  createPDF(images: Array<any>,name:string){
 
    console.log(images)
    let contentimg: Array<any>=[];
    let factura="";
    

    images.forEach(element => {
        
          let data:any ={image:element.content,fit:[700,700],pageBreak: 'after'};
          contentimg.push(data);
          factura=element.factura;
    });
    const pdfDefinition: any = {
        
      content: contentimg
    }
    
    
    const pdf = pdfm.createPdf(pdfDefinition);
    pdf.download(name);
  }
}
