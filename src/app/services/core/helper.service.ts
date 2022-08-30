import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public toastr: ToastrService) { }

  public onSuccess(sms : string, title = "Operacion Exitosa") {
    this.toastr.success(sms, title);
  }

  public onError(sms : string, title = "Operacion Fallida") {
    this.toastr.error(sms, title);
  }
}
