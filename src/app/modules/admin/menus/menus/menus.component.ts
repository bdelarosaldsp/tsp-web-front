import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { MenuService } from 'src/app/services/menu.service';
import { UsersService } from 'src/app/services/users.service';
import { Constant } from 'src/app/shared/constant';
import Swal from 'sweetalert2'
import { CreatemenuComponent } from '../createmenu/createmenu.component';

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
    public dialog:MatDialog,
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
              option.lastname.toLowerCase().includes(user)||option.firstname.toLowerCase().includes(user) || option.email.toLowerCase().includes(user)
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

        this.menusAply= this.menuService.getMenuFromUser(this.control.value?.menus);
        
        
        this.menusAply.forEach(element => {
          this.menus=this.menus.filter(x=>x.menu!=element.menu);
        });
        this.cdr.detectChanges()

        
      }
    );
    
    
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

  async asignarMenu(){
    Swal.fire({
                title: 'Advertencia',
                html: '¿Realmente desea asignar estos permisos?',
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
                  this.menusAdd.forEach((element: any) => {
                    let data={
                      id_menu:element.id,
                      id_usuario:this.control.value?.id
                    };
                  
                    this.userService.AsignarMenu(data).subscribe( {
                      next: (response) => {
                        this.toastr.success(response?.data);
                        this.menusAply.push(element);
                        this.selected(element);
                      },
                      error: (error) => {
                        console.log(error);
                        this.toastr.warning(error?.error?.message);
                      },complete: ()=> {
                        if (this.control.value?.id===Constant.AUTH.getUser()?.id) {
                          localStorage.clear();
                        }
                        this.menusAdd.length=0;
                      },
                    });
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

  onCreate(){
    const dialogRef = this.dialog.open(CreatemenuComponent, {
                        width: '500px',
                        height: '500px',
                      });
    dialogRef.afterClosed().subscribe(
    {
      complete: () => {
        if(this.control.valid){
          this.getMenus();
        }
      }
    });
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
