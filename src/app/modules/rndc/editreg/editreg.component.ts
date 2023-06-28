import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../images/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { RndcService } from 'src/app/services/rndc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editreg',
  templateUrl: './editreg.component.html',
  styleUrls: ['./editreg.component.scss']
})
export class EditregComponent implements OnInit {
  detsave:Array<any>=this.data.detalle;


  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private cdr:ChangeDetectorRef,
    private rndcService:RndcService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {cabecera:Array<any>,detalle:Array<any>,proceso_id:string}
  ) { 

  }

  ngOnInit(): void {
  }

  setValue(campo:string): string{
    var res = this.data.detalle.find(det=>
       det.campo==campo
    );
    return res.valor;

  }

  editValue(event:any){
    var res =this.detsave.find(det=>
      det.campo===event.srcElement.id
    );
    res.valor=event.srcElement.value;
    console.log(this.data.detalle);

  }

  onSave(){
    if(this.data.detalle === this.detsave){
      Swal.fire(
        {
          icon:'warning',
          title:"Registros sin cambios...",
          text:"No se realizaron cambios.",
          confirmButtonColor:"green",
          confirmButtonText:"Aceptar"
        });
    }else{

      let datareg={
        registro:this.detsave,
        id:this.data.proceso_id
      }

     this.rndcService.saveRegister(datareg).subscribe({
      next:(res)=> {
        if(res.data.save==='S'){
          this.toastr.success();
          Swal.fire({
            title: 'Registro actualizado!',
            text:'¿Desea reprocesar?',
            confirmButtonText:'SI',
            showCancelButton: true,
            cancelButtonText:'NO',
            
          }).then((result)=>{
            if (!result.isConfirmed) {
              Swal.fire({text:"No se reprocesó", icon:"info"});
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
}
