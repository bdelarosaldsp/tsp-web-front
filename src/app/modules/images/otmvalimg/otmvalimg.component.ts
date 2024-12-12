import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/services/clients.service';
import { CumImagesService } from 'src/app/services/cum-images.service';
import { Constant } from 'src/app/shared/constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otmvalimg',
  templateUrl: './otmvalimg.component.html',
  styleUrls: ['./otmvalimg.component.scss']
})
export class OtmvalimgComponent implements OnInit {

  
  controlDoc : FormControl  = new FormControl('', [Validators.required])
  validar:boolean;

  progressbar:boolean=false;
  label:string="";
  user:string=Constant.AUTH.getUser()?.email;
  Remimg:number=0;

  Remesas:Array<any>=[];
  Imagenes:Array<any>=[];

  constructor(
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private imgservice:CumImagesService
  ) {}

  ngOnInit(): void {
    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }
    
  }

  onClear(){
    this.Remesas.length=0;
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/images/valimg']);
    });
  }

  GetPlanilla(){
    this.progressbar=true;
    let planilla:string =this.controlDoc.value;
    this.imgservice.getRemesasOtm(planilla).subscribe(
      {
        next:(res)=>{
          if(res.data.message==='OK'){
            this.progressbar=false;
            this.Remesas=res.data.remesas;
            this.validar=res.data.validar;
            this.Remimg=res.data.imgpla;
            this.label="";
            this.cdr.detectChanges();
          }else{
            this.progressbar=false;
            this.Remesas=res.data.remesas;
            this.validar=res.data.validar;
            this.Remimg=res.data.imgpla;
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

  getImgRemesa(remesa:string){
    this.imgservice.getImages('10',2,remesa).subscribe(
      {
        next:(res)=>{
          console.log(res)
          let elementIndex = this.Remesas.findIndex((obj => obj.remesa === remesa));
          this.Remesas[elementIndex].imagenes = res.data.images;
         
          this.cdr.detectChanges();
        }
      }
    )
  }
  
  Validate(){
    this.imgservice.ValidarImagenes(this.controlDoc.value).subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.validar=false;
          this.cdr.detectChanges();
          Swal.fire({text:res.data.message,icon:'success'});

        }
      }
    )
  }
}