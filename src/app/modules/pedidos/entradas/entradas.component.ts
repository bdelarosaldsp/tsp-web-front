import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

  control : FormControl  = new FormControl('', [Validators.required]);
  progressbar:boolean=false;
  clients : Array<Client>;
  selectedcli:string;
  options: Client[];
  filteredOptions: Observable<any[]>;

  constructor(private clientService:ClientsService,
    private sanitizer:DomSanitizer, 
    public dialog:MatDialog,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
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
  onSearch(){
    
  }
  onClear(){
    this.control.setValue('');
    this.cdr.detectChanges();
  }

  displayFn(client: Client): string {
    return client && client.cliente_cod ? client.cliente_cod : '';
  }
}
