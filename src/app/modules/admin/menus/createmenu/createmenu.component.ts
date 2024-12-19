import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-createmenu',
  templateUrl: './createmenu.component.html',
  styleUrls: ['./createmenu.component.scss']
})
export class CreatemenuComponent {
  
  constructor(public dialogRef: MatDialogRef<CreatemenuComponent>,
    private menuService:MenuService,
    private toastr:ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: {}
    ) { }

  onCreate(categoria:string,menu:string,url:string){
    if (categoria==="" || menu===""||url==="") {
      Swal.fire('Debe diligenciar todos los campos');
    }
    
    let data={
      categoria:categoria,
      menu:menu,
      url:url
    }
    Swal.fire({
                    title: 'Advertencia',
                    html: '¿Realmente desea crear este menu?',
                    width:'50%',
                    showConfirmButton: true,
                    confirmButtonText:'Confirmar',
                    confirmButtonColor:'GREEN',
                    showCancelButton:true,
                    cancelButtonText:'Cancelar',
                    cancelButtonColor:'RED',
                    allowEscapeKey : false,
                    allowOutsideClick: false
                  }).then(async (result) => {
                    
                    if(result.isConfirmed){
                      
                      this.menuService.CreateMenu(data).subscribe( {
                        next: (response) => {
                          this.toastr.success(response?.data);
                        },
                        error: (error) => {
                          console.log(error);
                          this.toastr.warning(error?.error?.message);
                        }
                      });
                      
                    }
                  });
  }

}
