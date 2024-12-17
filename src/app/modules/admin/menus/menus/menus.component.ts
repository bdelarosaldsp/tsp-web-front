import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})

export class MenusComponent implements OnInit {

  control : FormControl  = new FormControl('', [Validators.required])
  options: User[];
  filteredOptions: Observable<any[]>;

  constructor(private cdr: ChangeDetectorRef,private router: Router, private userService:UsersService) {
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

  displayFn(user: User): string {
    console.log(user);
    return user ? user.firstname +' '+ user.lastname : '';
  }

  onClear(){
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/images/upload']);
    });
  }

}
