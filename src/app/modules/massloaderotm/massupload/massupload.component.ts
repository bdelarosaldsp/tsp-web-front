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
import { MassloadService } from 'src/app/services/massload.service';

@Component({
  selector: 'app-massupload',
  templateUrl: './massupload.component.html',
  styleUrls: ['./massupload.component.scss']
})


export class MassuploadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  label:string="";
  precarga:boolean=false;
  sortedData:any[];
  errores:any[]=[];
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = [];
  JSONData:any;
  dataSource = new MatTableDataSource<any>();
  
  csvContent: any;
  control : FormControl  = new FormControl('', [Validators.required]);
  progressbar:boolean=false;
  file:Array<any>=[]

  isEditableNew: boolean = true;
  constructor(
    private massloadSerrvice:MassloadService,
    public dialog:MatDialog,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router) { 
      
    }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
    this.cdr.detectChanges();
  }

 
  getHeader(){
    let obj =this.ELEMENT_DATA[0]
      const valor=(Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
        this.displayedColumns.push(key.toString())
      });
    
  }
  onUpload(){
    this.progressbar=true;
    this.cdr.detectChanges();

    const files = this.file;
    var fileTypes = ['csv']; //acceptable file types

    if (files && files.length) {
      var extension = files[0].name.split('.').pop().toLowerCase(); //file extension from input file
        
      var isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
      console.log(isSuccess)
      var that = this;
      //Flag to check the Validation Result
      if (isSuccess) {
        const fileToRead = files[0];

        const fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent:any) {
          const textFromFileLoaded = fileLoadedEvent.target.result;
          that.csvContent = textFromFileLoaded;

          let allData=[];
          //Flag is for extracting first line
          let flag = false;
          // Main Data
          let objarray: Array<any> = [];
          //Properties
          let prop: Array<any> = [];
          //Total Length
          let size: any = 0;

          for (const line of that.csvContent.split(/[\r\n]+/)) {
            if (flag) {
              let obj:any = {};
              for (let k = 0; k < size; k++) {
                //Dynamic Object Properties
                obj[prop[k]] = line.split(';')[k];
              }
              objarray.push(obj);
            } else {
              //First Line of CSV will be having Properties
              for (let k = 0; k < line.split(';').length; k++) {
                size = line.split(';').length;
                //Removing all the spaces to make them usefull
                prop.push(line.split(';')[k].trim().replace(/ /g, '_').replace('DEST_AGENCIA_CUMPLIDO','DESTINATION_AGENCIA_CUMPLIDO')
                .replace('DEST_AGENCIA_DESPACHO','DESTINATION_AGENCIA_DESPACHO')
                .replace('DEST_CODIGO_MUNICIPIO_RNDC','DESTINATION_CODIGO_MUNICIPIO_RNDC')
                .replace('TRANSPORT_HANDLING_UNIT_ID','THU').replace('SHIP_UNIT_ID','SHIP_UNIT_GID'));
              }
              flag = true;
            }
          }
          that.ELEMENT_DATA=objarray;
          that.JSONData=that.convertToJson(objarray);
          that.displayedColumns=prop;
          that.dataSource=new MatTableDataSource(that.ELEMENT_DATA);
          that.dataSource.paginator= that.paginator;

          let data ={
            data:objarray,
            headers:prop,
            data_str:that.JSONData
          }
          console.log(data)
          that.cdr.detectChanges();
          
        };
        fileReader.readAsText(fileToRead, 'UTF-8');

      } else {
        console.error('Invalid File Format!');
      }
    }
    
    this.progressbar=false;
    this.cdr.detectChanges();
  }

  convertToJson(data:any[]):string{

    var objStr= JSON.stringify(data);
    var formated= objStr.replace('DEST_AGENCIA_CUMPLIDO','DESTINATION_AGENCIA_CUMPLIDO')
    .replace('DEST_AGENCIA_DESPACHO','DESTINATION_AGENCIA_DESPACHO')
    .replace('DEST_CODIGO_MUNICIPIO_RNDC','DESTINATION_CODIGO_MUNICIPIO_RNDC')
    .replace('TRANSPORT_HANDLING_UNIT_ID','THU').replace('SHIP_UNIT_ID','SHIP_UNIT_GID')
    .replace(' ', '+');
    
    console.log(formated);
    return formated;
  }

  onClear(){
    this.ELEMENT_DATA.length=0;
    this.file.length=0;
    this.control.setValue('');
    this.precarga=false;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tsp/massload']);
    });
    
    
  }
  onSelect(event:any) {
    this.file.push(...event.addedFiles);    
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
    this.dataSource.paginator=this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  SendData(){
    if (this.ELEMENT_DATA.length>0) {
      this.massloadSerrvice.sendOrders(this.JSONData).subscribe({
        next: (response) => {
          console.log(response)
          if (response.STATUS==='FAILED') {
            Swal.fire({
              title:'Ha ocurrido un error',
              text:response.ERROR_MSGS,
              icon:'error'
            });
          }else{
            Swal.fire({
              title:'Realizado',
              text: 'Pedidos enviados con numero de transmisión: '+response.TRANSMISSION_NO,
              icon:'success'
            });
          }
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            title:'Ha ocurrido un error',
            text:error.error.error,
            icon:'error'
          });
        },
        complete: () => {
          this.onClear();
        }
      });
    }
  }

}
