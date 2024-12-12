import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tables-widget13',
  templateUrl: './tables-widget13.component.html',
})
export class TablesWidget13Component implements OnInit {
 
  Usuarios:Array<User>=[];
  
  constructor(
    private userService :UsersService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

    this.userService.getActives().subscribe((res)=>{
      let results:Array<any>=[];
      
      results=res.data;
      let count: number=0;
      results.forEach(element => {
        let user:User={
          'position':count+1,
          'id':element.id,
          'firstname':element.firstname,
          'lastname':element.lastname,
          'identification_number':element.identification_number,
          'email':element.email,
          'password':element.password,
          'google2fa_enable':element.google2fa_enable,
          'active':element.active
        };
        this.Usuarios.push(user);
        this.cdr.detectChanges();
      });
    });
    length = this.Usuarios.length;
    
   
    this.cdr.detectChanges();

  }
}
