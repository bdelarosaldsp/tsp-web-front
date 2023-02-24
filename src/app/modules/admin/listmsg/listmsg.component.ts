import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from 'src/app/models/messages';
import { MessagesService } from 'src/app/services/messages.service';
import Swal from 'sweetalert2';
import { ViewmsgComponent } from '../viewmsg/viewmsg.component';

const ELEMENT_DATA: Messages[] = [];

@Component({
  selector: 'app-listmsg',
  templateUrl: './listmsg.component.html',
  styleUrls: ['./listmsg.component.scss']
})
export class ListmsgComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private messageService:MessagesService, private cdr:ChangeDetectorRef,private dialog : MatDialog){
    
  }

  displayedColumns: string[] = ['name','estado','actions'];
  dataSource = new MatTableDataSource<Messages>(ELEMENT_DATA);

  ngOnInit() {
    this.getMessages();
  }

  getMessages(){
    this.dataSource.data=[];
    const data = this.dataSource.data;
    this.messageService.getList().subscribe((res)=>{
      let results:Array<any>=[];
      
      results=res.data;
      let count :number=1;
      results.forEach(element => {
        let user:Messages={
          'position':count,
          'id':element.id,
          'name':element.name.toUpperCase(),
          'message':element.message,
          'type':element.type,
          'range':element.range,
          'active':element.active ==='1' ? 'Activo': 'Inactivo'
        };
        count =count +1;
        data.push(user);
        this.dataSource.data=data;
        console.log(this.dataSource)
        this.cdr.detectChanges();
        
      });
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.sort.active;
    this.dataSource.sort = this.sort;
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


  EnDisMessage(id:string){
    this.messageService.actDeactMessages(id).subscribe((res)=>{
      console.log(res);
      this.getMessages();
    });
  }


  viewMessage(message:string){
    const dialogRef = this.dialog.open(ViewmsgComponent, {
      width: '90vw',
      height: '90vh',
      data:message
    });

    dialogRef.afterClosed().subscribe(
      {
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          // treat error
        },
        complete: () => {

        }
      });
  }

  deleteMessage(id:string){
    Swal.fire(
      {
        title:"Se eliminará el mensaje...",
        text:"¿Está seguro de eliminar el mensaje?",
        showCancelButton:true,
        cancelButtonColor:"red",
        cancelButtonText:"Cancelar",
        confirmButtonColor:"green",
        confirmButtonText:"Sí, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.messageService.deleteMessage(id).subscribe((res)=>{
            console.log(res);
            this.getMessages();
          });
        }
      });
    
  }
  
}
