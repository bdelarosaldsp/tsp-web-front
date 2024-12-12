import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog,  MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-politicadatos',
  templateUrl: './politicadatos.component.html',
  styleUrls: ['./politicadatos.component.scss']
})
export class PoliticadatosComponent {


  time= new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  controlName: FormControl  = new FormControl('', [Validators.required,])
  controlCc : FormControl  = new FormControl('', [Validators.required])
  controlFirma : boolean=false;
  controlFec : FormControl  = new FormControl( this.time )
  constructor(public dialog:MatDialogRef<PoliticadatosComponent>) { }




  Firmar() {

    if(this.controlName.value.toUpperCase() !== (Constant.AUTH.getUser()?.firstname.toUpperCase()+' '+Constant.AUTH.getUser()?.lastname.toUpperCase())) 
    {
      
      this.controlName.setErrors({'Name':'El nombre ingresado no coincide con el del usuario'})
      this.controlName.invalid;
      
    }

    if(this.controlCc.value !== (Constant.AUTH.getUser()?.identification_number)) 
    {
      
      this.controlCc.setErrors({'ID':'La cédula ingresada no coincide con la del usuario'})
      this.controlCc.invalid
      
    }

    if (this.controlName.valid && this.controlCc.valid && this.controlFirma===true){

      this.dialog.close(this.controlName.value.toUpperCase());

    }

  }

}
