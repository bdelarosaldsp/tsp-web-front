import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Constant } from 'src/app/shared/constant';
import { Papa } from 'ngx-papaparse';
import { MatTableDataSource } from '@angular/material/table';
import { Console } from 'console';
import { Sort } from '@angular/material/sort';
import { Articulo } from 'src/app/models/article';
import Swal from 'sweetalert2';
import { Almacen } from 'src/app/models/almacen';
import { GeneralService } from 'src/app/services/general.service';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  label:string="";
  precarga:boolean=false;
  sortedData:any[];
  errores:any[]=[];
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  control : FormControl  = new FormControl('', [Validators.required]);
  progressbar:boolean=false;
  file:Array<any>=[]
  clients : Array<Client>;
  almacenes: Array<Almacen>;
  selectedcli:string;
  options: Client[];
  filteredOptions: Observable<any[]>;
  VOForm: FormGroup;
  isEditableNew: boolean = true;
  constructor(private clientService:ClientsService,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private papa:Papa,
    private pedidosServ:PedidosService, 
    private generalServ:GeneralService,
    public dialog:MatDialog,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router) { 
      
    this.getClients();
    this.getAlmacenes();
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  setDatasource(){
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    
     this.VOForm = this.fb.group({
              VORows: this.fb.array(this.ELEMENT_DATA.map(val => this.fb.group(
                
                   this.setFgroup(val)
                
              ))
              ) 
            }); 

    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    this.dataSource.paginator=this.paginator;
    this.cdr.detectChanges();
  }
  getHeader(){
    let obj =this.ELEMENT_DATA[0]
      const valor=(Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
        this.displayedColumns.push(key.toString())
      });

      
      this.displayedColumns.push('ACTION')
    
  }

  setFgroup(val:any):Array<any>{
    let cont=0;
    let fg:Array<any>=[];
    this.displayedColumns.forEach((key)=>{
      if(cont==0){
        var control=new FormControl(val[key]);
        
        fg.push({[key]:control});
      
        cont=cont+1;
      }else{
        var control=new FormControl(val[key]);
        var arr=fg[0];
        arr[key]=control;
        fg.splice(0,1,arr);
      }
      
    });
      
    var arr=fg[0];
    arr['action']=new FormControl('existingRecord');
    arr['isEditable']=new FormControl(true);
    arr['isNewRow']= new FormControl(false);

    fg.splice(0,1,arr);
    
    
    return fg[0];
                
  }
  
  getApparence(index:number):boolean{
    //console.log(this.VOForm)
    if(this.VOForm.get('VORows')?.value[index].isEditable){
      return true
    }
    
    return false
  }
  getClients(){
  
    this.clientService.getClients(Constant.AUTH.getUser()?.email).subscribe(
      {
        next:(res)=>{
          this.options = res.data;
        }
      }
      
    );
  }
  getAlmacenes(){
    this.generalServ.getAlmacenes().subscribe(
      {
        next:(res)=>{
          this.almacenes=res.data;
        }
      }
    );
  }
  onUpload(){
    
    this.papa.parse(this.file[0], { 
      skipEmptyLines: true,
      header: true,
      complete: (results) => {
      
        this.ELEMENT_DATA=results.data;
        this.getHeader();
        this.setDatasource();
        this.precarga=true;
        this.cdr.detectChanges();
       
      }
    });
    
  }

  onValidate(){
    let articulos:Array<any>=[];
    let Res:Array<any>=this.VOForm.get('VORows')?.value;
    Res.forEach((art)=>{
      let articulo:Articulo={
        codigo:art.CODART,
        almacen:art.ALMACEN,
        cod_propie:this.selectedcli
      }
      if(!this.almacenes.find((alm)=>alm.cod_almacen==art.ALMACEN)){
        let linea=Res.indexOf(art)+1;
        Swal.fire({title:'Almacen invalido',icon:'error',text:'El almacen '+art.ALMACEN +' no existe, validar la linea '+ linea})
        return;
      }else{
        articulos.push(articulo);
      }
    });

    let data={
      articulos:articulos
    }
    this.label='Validando articulos';
    this.progressbar=true;
    this.cdr.detectChanges();
    this.pedidosServ.validateArticles(data).subscribe((res)=>{
     
      articulos=res.data
    
      if(articulos.length>0){
        this.progressbar=false;
        this.label='';
        this.cdr.detectChanges();
        let text:string='';
        text += '<style type="text/css">'
        text += ".tg  {border-collapse:collapse;border-spacing:0;}"
        text += ".tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;"
        text += " overflow:hidden;padding:10px 5px;word-break:normal;}"
        text += ".tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;"
        text += "font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}"
        text += ".tg .tg-0lax{text-align:left;vertical-align:top}"
        text += "table{width:100%}"
        text += "</style>"

        text += '<div class="container">'
        text += '<table class="tg">'
        text += "	<thead>"
        text += "		<tr>"
        text += '			<th class="tg-0Lax"><strong>REFERENCIA</strong></th>'
        text += '			<th class="tg-0Lax"><strong>ALMACEN</strong></th>'
        text += "		</tr>"
        text += "	</thead>"
        text += "	<tbody>"

        articulos.forEach((art)=>{
          let Artstr=art.toString();
          var res= Artstr.split('-');
          this.errores.push(res[0]);
          
          text += "	  <tr>"
          text += '		<td class="tg-0Lax">' + res[0] + '</td>'
          text += '		<td class="tg-0Lax">' + res[1] + '</td>'
          text += "	  </tr>"

        });
        
        text += "	</tbody>"
        text += "</table>"
        text += "</div>"
        text += "<br>"
        text += "<h3>¿Desea seguir con las referencias existentes?</h3>"

        Swal.fire({
          title: 'REFERENCIAS INEXISTENTES',
          html:text,
          confirmButtonText:'Continuar',
          showCancelButton: true,
          cancelButtonText:'Cancelar',
          allowEscapeKey:false
          
        }).then((result)=>{
          if (!result.isConfirmed) {
            Swal.fire({text:"Se detuvo el proceso, valide las referencias no existentes", icon:"info"});
          }else {
            this.ELEMENT_DATA= this.ELEMENT_DATA.filter(item => !this.errores.includes(item.CODART));
            this.cdr.detectChanges();
            if(this.ELEMENT_DATA.length==0){
              Swal.fire({text:"Sin registros para procesar", icon:"info"});
              this.onClear();
            }else{
              this.label='Procesando archivo';
              this.progressbar=true;
              this.cdr.detectChanges();

              this.pedidosServ.createFileEnt({pedidos:this.ELEMENT_DATA, aliado:this.selectedcli}).subscribe({
                next:(res)=> {
                  this.label='';
                  this.progressbar=false;
                  this.cdr.detectChanges();
                  Swal.fire({text:"Procesando, favor validar en rastros de ejecución con el nombre de archivo: "+ res.data, icon:"success"});
                  this.onClear();
                },error:(err)=>{
                  this.label='';
                  this.progressbar=false;
                  this.cdr.detectChanges();
                  Swal.fire({text:"Error al crear plano, contacte a Soporte", icon:"error"});
                  this.onClear();
                }
              })
                
            }
            
          }
        });
        
      }else{
        this.label='Procesando archivo';
        this.progressbar=true;
        this.cdr.detectChanges();

        this.pedidosServ.createFileEnt({pedidos:this.ELEMENT_DATA, aliado:this.selectedcli}).subscribe({
          next:(res)=> {
            this.label='';
            this.progressbar=false;
            this.cdr.detectChanges();
            Swal.fire({text:"Procesando, favor validar en rastros de ejecución con el nombre de archivo: "+ res.data, icon:"success"});
            this.onClear();
          },error:(err)=>{
            this.label='';
            this.progressbar=false;
            this.cdr.detectChanges();
            Swal.fire({text:"Error al crear plano, contacte a Soporte", icon:"error"});
            this.onClear();
          }
        })
              
      }
      
    });
    this.progressbar=false;
    this.cdr.detectChanges();
  }
  onClear(){
    this.ELEMENT_DATA.length=0;
    this.file.length=0;
    this.control.setValue('');
    this.precarga=false;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/pedidos/entradas']);
    });
    
    
  }
  onSelect(event:any) {
    this.file.push(...event.addedFiles);    
  }
  applyFilter(event: Event) {
    //  debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
     
        return this.compare(a.active, b.active, isAsc);
       
    });
    this.dataSource.data=this.sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }

  EditSVO(VOFormElement:any, i:number) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  SaveVO(VOFormElement:any, i:number) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    
  }

  CancelSVO(VOFormElement:any, i:number) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

}
