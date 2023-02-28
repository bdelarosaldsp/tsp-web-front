import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component,  OnInit,  ViewChild } from '@angular/core';
import { User } from 'src/app/models/users';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from 'src/app/services/users.service';
import {MatSort, Sort} from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { RegistrationComponent } from 'src/app/modules/auth/components/registration/registration.component';
import { MatDialog } from '@angular/material/dialog';


const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortedData: User[];
  constructor(private userService:UsersService,private authService:AuthService, private cdr:ChangeDetectorRef,private dialog : MatDialog){
    this.getUsuarios();
  }

  displayedColumns: string[] = ['name','identification', 'email', '2fa','estado','actions'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);


  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'state':
          return compare(a.active, b.active, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data=this.sortedData;
  }

  getUsuarios(){
    this.dataSource.data=[];
    const data = this.dataSource.data;
    let Users:Array<User>=[];
    this.userService.getActives().subscribe((res)=>{
      let results:Array<any>=[];
      
      results=res.data;
      let count :number=1;
      results.forEach(element => {
        let user:User={
          'position':count,
          'id':element.id,
          'firstname':element.firstname.toUpperCase(),
          'lastname':element.lastname.toUpperCase(),
          'identification_number':element.identification_number,
          'email':element.email,
          'password':element.password,
          'google2fa_enable':element.google2fa_enable ==='1' ? 'Activo': 'Restaurado',
          'active':element.token ===null ?'Desconectado':'Conectado'
        };
        count =count +1;
        data.push(user);
        this.dataSource.data=data;
        this.cdr.detectChanges();
        
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cierreSesion(active:string,user:string,id:number){
    if (active==='Conectado'){
      this.userService.LogoutUser(user).subscribe((res)=>{
        if(res.status==='success'){
          /*this.authService.verifyToken(id).subscribe((resp)=>{
          });*/
        }
      });
      this.getUsuarios();
    }
  }

  ChangePass(user:string){
    Swal.fire({
      title: 'Cambio de Contraseña',
      input:'password',
      inputLabel:'Contraseña nueva:',
      confirmButtonText:'Cambiar contraseña',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      inputPlaceholder: 'Escriba la nueva contraseña',
      preConfirm(inputValue) {
        if (inputValue === null) return false;
        if (inputValue === "") {
          Swal.showValidationMessage('Debe escribir la contraseña');
          return false;
        }
      },
    }).then((result)=>{
      if (!result.isConfirmed) {
        Swal.fire({text:"No se cambio la contraseña", icon:"info"});
      }else {
        this.userService.ChangePass(user,result.value||'').subscribe((res)=>{
          console.log(res.data)
          if(res.data!==typeof(undefined)){
            Swal.fire({text:"contraseña cambiada correctamente",icon:"success"});
          }
        });
       
      }
    });
      
  }

  disable2fa(user:string){
    this.userService.Disable2fa(user).subscribe((res)=>{
      console.log(res);
      this.getUsuarios();
    });
  }

  DeleteUser(user:string){
    this.userService.DeleteUser(user).subscribe((res)=>{
      if (res.data==='DELETED'){
        Swal.fire({text:"Usuario eliminado correctamente",icon:"success"});
        this.getUsuarios();
      }else{
        Swal.fire({text:"El usuario no fue eliminado ",icon:"info"});
        this.getUsuarios();
      }
      
    });
  }

  CreateUser(){
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '400px',
      maxHeight: '90vh',
      data : {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      
      //this.agency = JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.agency)!);
      //this.cdr.detectChanges();

      
      
    });

  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}