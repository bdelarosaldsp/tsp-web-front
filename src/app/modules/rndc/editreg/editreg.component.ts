import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../images/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { RndcService } from 'src/app/services/rndc.service';
import { ToastrService } from 'ngx-toastr';
import { Console } from 'console';
import { DataSearchComponent } from '../data-search/data-search.component';

@Component({
  selector: 'app-editreg',
  templateUrl: './editreg.component.html',
  styleUrls: ['./editreg.component.scss']
})


export class EditregComponent implements OnInit {
  detsave:Array<any>=[];
  proceso:string="";

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public dialog:MatDialog,
    private cdr:ChangeDetectorRef,
    private rndcService:RndcService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {cabecera:Array<any>,detalle:Array<any>,proceso_id:string,sucursal:string}
  ) { 
    this.proceso=data.cabecera[0].proceso;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.data.detalle.forEach((det)=>{
        (document.getElementById(det.campo) as HTMLInputElement).value=det.valor;
        
      })
    }, 0);
  }


  setValue(event:any){
   
    console.log(event.srcElement.id)
    var res = this.data.detalle.find(det=>
       det.campo==event.srcElement.id
    );
    if(typeof(res)=='undefined')
    {
      
      (document.getElementById(event.srcElement.id) as HTMLInputElement).value= "Sin Valor";
    }else{
      (document.getElementById(event.srcElement.id) as HTMLInputElement).value= res.valor;
    }
    

  }

  editValue(event:any){
    var res =this.data.detalle.find(det=>
      det.campo===event.srcElement.id
    );
    res.valor=event.srcElement.value;
    this.detsave.push(res);
    console.log(this.detsave)
  }

  searchData(campo:string){
    const dialogRef = this.dialog.open(DataSearchComponent, {
      width: '700px',
      data:{nom_campo:campo,sucursal:this.data.sucursal}
    });
  
    dialogRef.afterClosed().subscribe(
      {
        next: (response) => {
          if(typeof(response.mintr)!=="undefined"){
            if(campo==='NUMIDDESTINATARIO'){
              (document.getElementById('NUMIDDESTINATARIO') as HTMLInputElement).value= response.mintr;
              (document.getElementById('CODTIPOIDDESTINATARIO') as HTMLInputElement).value= response.tipodoc_mintr;
              (document.getElementById('CODSEDEDESTINATARIO') as HTMLInputElement).value= response.sede_mintr;


              var res =this.data.detalle.find(det=>
                det.campo===campo
              );
              res.valor=response.mintr;
              this.detsave.push(res);

              var res =this.data.detalle.find(det=>
                det.campo==='CODTIPOIDDESTINATARIO'
              );
              res.valor=response.tipodoc_mintr;
              this.detsave.push(res);

              var res =this.data.detalle.find(det=>
                det.campo==='CODSEDEDESTINATARIO'
              );
              res.valor=response.sede_mintr;
              this.detsave.push(res);

              console.log(this.detsave)
            }else if(campo==='NUMIDREMITENTE'){
              (document.getElementById('NUMIDREMITENTE') as HTMLInputElement).value= response.mintr;
              (document.getElementById('CODTIPOIDREMITENTE') as HTMLInputElement).value= response.tipodoc_mintr;
              (document.getElementById('CODSEDEREMITENTE') as HTMLInputElement).value= response.sede_mintr;
            }else if(campo==='NUMIDPROPIETARIO'){
              (document.getElementById('NUMIDPROPIETARIO') as HTMLInputElement).value= response.mintr;
              (document.getElementById('CODTIPOIDPROPIETARIO') as HTMLInputElement).value= response.tipodoc_mintr;
              (document.getElementById('CODSEDEPROPIETARIO') as HTMLInputElement).value= response.sede_mintr;

              var res =this.data.detalle.find(det=>
                det.campo===campo
              );
              res.valor=response.mintr;
              this.detsave.push(res);

              var res =this.data.detalle.find(det=>
                det.campo==='CODTIPOIDPROPIETARIO'
              );
              res.valor=response.response.tipodoc_mintr;
              this.detsave.push(res);

              var res =this.data.detalle.find(det=>
                det.campo==='CODSEDEPROPIETARIO'
              );
              res.valor=response.sede_mintr;
              this.detsave.push(res);
              
              console.log(this.detsave)
            }
          }
          
        },
        error: (error) => {
          
        },
        complete: () => {
          
        }

      });
  }

  onSave(){
    
    if(this.detsave.length==0){
      Swal.fire(
        {
          icon:'warning',
          title:"Registros sin cambios...",
          text:"No se realizaron cambios. Desea reprocesar el registro?",
          confirmButtonText:'SI',
          showCancelButton: true,
          cancelButtonText:'NO',
          
        }).then((result)=>{
          if (!result.isConfirmed) {
            Swal.fire({text:"No se reprocesó", icon:"info"});
            this.onClear();
          }else {
            this.rndcService.reSend(this.data.proceso_id).subscribe({
              next:()=> {
                this.toastr.success('Registro reprocesado');
              },
              error:(err) =>{
                this.toastr.error('Error:'+err.message);
              },
            })
          }
        });
    }else{
      let datareg={
        registro:this.detsave,
        id:this.data.proceso_id
      }

      this.rndcService.saveRegister(datareg).subscribe({
      next:(res)=> {
        console.log(res)
        if(res.data.save==='S'){
          
          this.toastr.success(res.data.mensaje);
          Swal.fire({
            title: 'Registro actualizado!',
            text:'¿Desea reprocesar?',
            confirmButtonText:'SI',
            showCancelButton: true,
            cancelButtonText:'NO',
            
          }).then((result)=>{
            if (!result.isConfirmed) {
              Swal.fire({text:"No se reprocesó", icon:"info"});
              this.onClear();
            }else {
              this.rndcService.reSend(this.data.proceso_id).subscribe({
                next:()=> {
                  this.toastr.success('Registro reprocesado');
                },
                error:(err) =>{
                  this.toastr.error('Error:'+err.data.error);
                },
              })
             
            }
          });
        }
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        
      }
     });
    }


  }

  onClear(){
    this.data.cabecera=[];
    this.data.detalle=[];
    this.data.proceso_id="";
    this.detsave=[];
    
  }
}
