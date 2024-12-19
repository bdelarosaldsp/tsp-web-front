import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { MenuService } from 'src/app/services/menu.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})

export class MenusComponent implements OnInit {

  control : FormControl  = new FormControl('', [Validators.required])
  options: User[];
  menus:any[]=[];
  menusAply:any []=[];
  menusAdd :any[]=[];
  filteredOptions: Observable<any[]>;

  constructor(private cdr: ChangeDetectorRef,private router: Router,
    private userService:UsersService,
    private menuService:MenuService,
    private toastr:ToastrService) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
          map((value) => {
            const user = typeof value === 'string' ? value.toLowerCase() : value?.firstname.toLowerCase();
            return this.options.filter((option)=>
              option.lastname.toLowerCase().includes(user)||option.firstname.toLowerCase().includes(user)
            );
          })
        );
  }

  getUsers(){
    
    this.userService.getActives().subscribe(
      res => {
        this.options = res.data;
      }
      
    )
  }

  async getMenus(){
    
    await this.menuService.getActives().subscribe(
      res => {
        this.menus = res.data;
        this.cdr.detectChanges();
      }
    );
    
    this.menusAply= await this.menuService.getMenuFromUser(this.control.value?.menus);
    this.cdr.detectChanges();
  }

  async desasignarMenu(menu:any){
    Swal.fire({
                title: 'Advertencia',
                html: '¿Realmente desea desasignar '+menu?.menu+'?',
                width:'70%',
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
                  let data={
                      id_menu:menu.id,
                      id_usuario:this.control.value?.id
                    
                  };
                  
                  this.userService.DesasignarMenu(data).subscribe( {
                    next: (response) => {
                      this.toastr.success(response?.data)
                    },
                    error: (error) => {
                      this.toastr.warning(error?.errors[0])
                    }
                  });
                }
              });
    
  }

  selected(menu:any){
    if (this.menusAdd.includes(menu)){
      var indice = this.menusAdd.indexOf(menu);
      this.menusAdd.splice(indice, 1);
    }else{
      this.menusAdd.push(menu);
    }
    
    this.cdr.detectChanges();
  }

  displayFn(user: User): string {
    
    return user ? user.firstname +' '+ user.lastname : '';
  }

  onClear(){
    this.menus.length=0;
    this.menusAdd.length=0;
    this.menusAply.length=0;
    
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/menususr']);
    });
  }

}
