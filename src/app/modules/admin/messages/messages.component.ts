import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MessagesService } from 'src/app/services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  fecha:Date= new Date();
  copymail: boolean= false;
  indefinido: boolean=false;
  controlTitle : FormControl  = new FormControl('', [Validators.required])
  controlType : FormControl  = new FormControl('', [Validators.required])
  controlRange : FormControl  = new FormControl('', [Validators.required])

  day = this.fecha.getDate()+1
  month = this.fecha.getMonth() + 1
  year = this.fecha.getFullYear()

  controlFecIni : FormControl  = new FormControl(`${this.year}-${this.month<10?'0'+this.month:this.month}-${this.day}`);
  controlFecFin : FormControl  = new FormControl(`${this.year}-${this.month<10?'0'+this.month:this.month}-${this.day}`);
  
  controlMessage : string ="";
  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Ingrese el mensaje quí...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  progressbar:boolean=false;
  label:string="";
 
  constructor(private messageService:MessagesService, private cdr:ChangeDetectorRef, private router:Router) {
    console.log(this.controlFecIni)
   }

 

  addMessage(){
    if(this.controlMessage===""){
      Swal.fire(
      {
        title:'Error',
        text:'El campo mensaje es requerido',
        icon:'warning'
      });
    }else{

      Swal.fire(
      {
        title:"Se guardará el mensaje...",
        text:"¿Está seguro de guardar el mensaje?",
        showCancelButton:true,
        cancelButtonColor:"red",
        cancelButtonText:"Cancelar",
        confirmButtonColor:"green",
        confirmButtonText:"Sí, guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          let data: any={
            name:this.controlTitle.value,
            message: this.controlMessage,
            type:this.controlType.value,
            range:this.controlRange.value,
            mail_copy:this.copymail
          }
          this.messageService.addMessage(data).subscribe(
            {
              next:(res)=>{
                Swal.fire(res.data.message);
                this.onClear();
              },
              error:(err)=>{
                console.log(err);
                Swal.fire({text:err.error.message,icon:"info"});
                
              }
            }
          )
        }
      });

      
    }
    
  }

  onClear(){
    this.controlMessage='';
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/messages']);
  });
  }
}
