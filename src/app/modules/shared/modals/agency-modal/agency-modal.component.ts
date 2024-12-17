import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-agency-modal',
  templateUrl: './agency-modal.component.html',
  styleUrls: ['./agency-modal.component.scss']
})
export class AgencyModalComponent implements OnInit {
  agencies : Array<any> =  [];

  control : FormControl  = new FormControl('', [Validators.required])
  constructor(private authService: AuthService, private toastr : ToastrService, public dialogRef: MatDialogRef<AgencyModalComponent>,  @Inject(MAT_DIALOG_DATA) public data: { }) { 
    this.agencies= authService.getAgenciesFromUser();
  }

  ngOnInit(): void {
  }
  
  getAgency(){
    return Constant.AUTH.getAgency();
  }
  close() {
    this.dialogRef.close()
  }
  save(){
    console.log(this.control);
    
    if(this.control.invalid){
      this.toastr.error("Debe seleccionar una Agencia", "Cambio Agencia");
      return;
    }
    this.authService.setAgency(this.control.value);
      this.toastr.success("Agencia Seleccionada correctamete", "Cambio Agencia");
      this.close();
  }
}
