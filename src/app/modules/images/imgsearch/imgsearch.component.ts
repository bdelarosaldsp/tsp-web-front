import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { CumImagesService } from 'src/app/services/cum-images.service';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-imgsearch',
  templateUrl: './imgsearch.component.html',
  styleUrls: ['./imgsearch.component.scss']
})
export class ImgsearchComponent implements OnInit  {

  
  control : FormControl  = new FormControl('', [Validators.required]);
  controlDoc : FormControl  = new FormControl('', [Validators.required]);
  controlType : FormControl  = new FormControl('', [Validators.required]);
  progressbar:boolean=false;
  clients : Array<Client>;
  selectedcli:string;
  files: Array<any> = [];

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
    this.imgservice.getImages(this.selectedcli,this.controlType.value,this.controlDoc.value)
    .subscribe(
      {
        next:(response)=>{
          if(response.data?.message =='Busqueda completa'){
            this.files=response.data?.images;
            
          }
        },
        error:(error)=>{
         this.toastr.error(error);
        },
        complete:()=>{
          this.progressbar=false;
          this.cdr.detectChanges();
          if(this.files.length>0){
            this.toastr.success('Busqueda completa');
          }else{
            this.toastr.warning('Sin imagenes por mostrar');
          }
          
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

}
