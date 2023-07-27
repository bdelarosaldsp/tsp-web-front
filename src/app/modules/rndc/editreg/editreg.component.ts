import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../images/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { RndcService } from 'src/app/services/rndc.service';
import { ToastrService } from 'ngx-toastr';
import { Console } from 'console';

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
    private cdr:ChangeDetectorRef,
    private rndcService:RndcService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {cabecera:Array<any>,detalle:Array<any>,proceso_id:string}
  ) { 
    this.proceso=data.cabecera[0].proceso;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.data.detalle.forEach((det)=>{
        if (!det.campo.includes('CODTIPOID')){
          (document.getElementById(det.campo) as HTMLInputElement).value=det.valor;
        }else{
          /*var select=(document.getElementById(det.campo) as HTMLSelectElement);
          let index:number;
          switch(det.valor) { 
            case "C": { 
              index=0;
              break; 
            } 
            case "N": { 
              index=1;
              break; 
            } 
            case "P": { 
              index=2;
              break; 
            } 
            case "E": { 
              index=3;
              break; 
            } 
            case "T": { 
              index=4;
              break; 
            } 
            case "U": { 
              index=5;
              break; 
            } 
            default: { 
               index=0; 
               break; 
            }
         } */

          
        }
        
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
