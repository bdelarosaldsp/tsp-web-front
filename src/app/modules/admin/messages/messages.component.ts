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

  controlTitle : FormControl  = new FormControl('', [Validators.required])
  controlType : FormControl  = new FormControl('', [Validators.required])
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
 
  constructor(private messageService:MessagesService, private cdr:ChangeDetectorRef, private router:Router) { }

 

  addMessage(){
    console.log(this.controlMessage)
    if(this.controlMessage===""){
      Swal.fire(
      {
        title:'Error',
        text:'El campo mensaje es requerido',
        icon:'warning'
      }
      );
    }else{
      let data: any={
        name:this.controlTitle.value,
        message: this.controlMessage,
        type:this.controlType.value,
        range:'A'
      }
      console.log(data)
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
    
  }

  onClear(){
    this.controlMessage='';
    this.cdr.detectChanges();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/messages']);
  });
  }
}
