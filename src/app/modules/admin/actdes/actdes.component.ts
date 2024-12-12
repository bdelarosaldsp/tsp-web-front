import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-actdes',
  templateUrl: './actdes.component.html',
  styleUrls: ['./actdes.component.scss']
})
export class ActdesComponent implements OnInit {

  destwms:Array<any>=[];
  control : FormControl  = new FormControl('', [Validators.required]);
  controlDest : FormControl = new FormControl('',[Validators.required])
  options: Client[];
  progressbar:boolean=false;
  clients : Array<Client>;
  selectedcli:string;
  filteredOptions: Observable<any[]>;
  
  constructor(private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,private clientService:ClientsService) { 
      this.getClients();
    }

  ngOnInit(): void {
    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }

    this.filteredOptions = this.control.valueChanges.pipe(
      map((value) => {
        const client = typeof value === 'string' ? value.toLowerCase() : value?.cliente_cod.toLowerCase();
        return this.options.filter((option)=>
          option.cliente_cod.toLowerCase().includes(client)
        );
      })
    );
  }

  onSearch(){
    this.destwms.length=1;
  }

  getClients(){
  
    this.clientService.getClients(Constant.AUTH.getUser()?.email).subscribe(
      {
        next:(res)=>{
          this.options = res.data;
        }
      }
      
    );
  }
  onClear(){
    this.destwms.length=0;
    this.control.setValue('');
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/actdest']);
    });
    
    
  }

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }
}
