import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as chLang} from './modules/i18n/vocabs/ch';
import {locale as esLang} from './modules/i18n/vocabs/es';
import {locale as jpLang} from './modules/i18n/vocabs/jp';
import {locale as deLang} from './modules/i18n/vocabs/de';
import {locale as frLang} from './modules/i18n/vocabs/fr';
import { catchError, interval, map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Constant } from './shared/constant';
import { Endpoint } from './shared/endpoints';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from './services/messages.service';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { PoliticadatosComponent } from './modules/admin/politicadatos/politicadatos.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  
  isLoading$: Observable<boolean>;
  ipserver:string;
  Messages:Array<any>=[];

  constructor(
    public dialog:MatDialog,
    private translationService: TranslationService,
    private authService: AuthService,
    private router:Router,
    private http: HttpClient,
    private messagesService: MessagesService

    ) { 




    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );

    this.isLoading$ = this.authService.isLoading$;
    
   
    
  }

  
  ngOnInit()  {

    if(Constant.AUTH.getToken()!==null){
      //this.getMesages();
      // const time= interval(1000*60*5);
      // time.subscribe({
      //   next:(res)=>{
      //     console.log('Se ejecuta');
      //     this.authService.verifyToken(Constant.AUTH.getUser()?.id).subscribe((resp)=>{
      //       console.log(resp);
      //     });
      //   }
      // });
    }
  }

  getMesages(){
    this.http.get(this.router.url).subscribe({
      next:(res)=>{
        
        if(!res.toString().includes("/auth/")){
          let email:string=Constant.AUTH.getUser()?.email;
          let typeusr: string=Constant.AUTH.getUser()?.roles[0]?.id;
          this.messagesService.getMessages(email,typeusr).subscribe(
            {
              next:(resp)=>{
                this.Messages=resp.data;
                this.Messages.forEach(message => {
                  console.log(message.type)
                  if (message.type==='R'){
                    Swal.fire({
                      title: message.name,
                      html: message.message,
                      width:'70%',
                      showConfirmButton: true,
                      confirmButtonText:'Leido',
                      confirmButtonColor:'GREEN',
                      showCancelButton:true,
                      cancelButtonText:'Cancelar',
                      cancelButtonColor:'RED',
                      allowEscapeKey : false,
                      allowOutsideClick: false
                    }).then((result) => {
                    
                      if (!result.isConfirmed) {
                        Swal.fire('Es necesario confirmar lectura del mensaje', '', 'info')
                        .then((result) => {
                          if (result.isConfirmed) {
                            this.authService.logout().subscribe(
                              res => {
                                document.location.reload();
                              }
                            );
                          }
                          
                        });
                      } else{
                        let data: any={
                          'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                          'message_id':message.id
                        }
                        this.messagesService.ReadMessage(data).subscribe((res)=>{
                          console.log(res);
                        });
                        Swal.fire('Confirmación de lectura enviada', '', 'success');
                      }
                    });
                  }else if(message.type==='O'){
                    Swal.fire({
                      title: message.name,
                      html: message.message,
                      width:'70%',
                      input:'checkbox',
                      
                      allowEscapeKey : false,
                      allowOutsideClick: false,
                      preConfirm(inputValue) {
                        if (inputValue === null) return false;
                        if (inputValue === 0) {
                          Swal.showValidationMessage('Debe aceptar y firmar');
                          return false;
                        }
                      },
                    }).then((result)=>{
                      if (!result.isConfirmed) {
                        Swal.fire('Es necesario firmar el consentimiento', '', 'info')
                        .then((result) => {
                          if (result.isConfirmed) {
                            this.authService.logout().subscribe(
                              res => {
                                document.location.reload();
                              }
                            );
                          }
                        });
                      } else{
                        let data: any={
                          'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                          'message_id':message.id,
                          'token':Constant.AUTH.getToken()
                        }
                        this.messagesService.ReadMessage(data).subscribe((res)=>{
                          console.log(res);
                        });
                        Swal.fire('Aceptacion y firma enviada', '', 'success');
                      }

                    });
                  }else if(message.type==='I'){
                    Swal.fire(
                      { 
                        title:message.title,
                        html:message.message,
                        width:'70%',
                        icon:"info",
                        timer:1000*30,
                        timerProgressBar:true
                      }).then(() => {
                        
                        let data: any={
                          'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                          'message_id':message.id
                        }
                        this.messagesService.ReadMessage(data).subscribe((res)=>{
                          console.log(res);
                        });
                      
                      });;
                  }
                });
              },error:(err)=>{
                console.log(err)
              }
          });
          
        }
      
      },
      error:(err)=>{

        if(!err.url.includes("/auth/")){
          let email:string=Constant.AUTH.getUser()?.email;
          let typeusr: string=Constant.AUTH.getUser()?.roles[0]?.id;
          this.messagesService.getMessages(email,typeusr).subscribe(
            {
              next:(resp)=>{
                this.Messages=resp.data;
                this.Messages.forEach(message => {
              if(message.name==='POLITICA DE TRATAMIENTO DE DATOS PERSONALES'){
                const dialogRef = this.dialog.open(PoliticadatosComponent, {
                  width: '90vw',
                  height: '90vh',
                  disableClose:true,
                  
                });

                dialogRef.afterClosed().subscribe(res=>
                  {
                    
                      let data: any={
                        'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                        'message_id':message.id,
                        'text':res
                      }
                      this.messagesService.ReadMessage(data).subscribe((res)=>{
                        console.log(res);
                      });
                      Swal.fire('Aceptacion y firma enviada', '', 'success');
                    
                  });
                
              }else if (message.type==='R'){
                Swal.fire({
                  title: message.name,
                  html: message.message,
                  width:'70%',
                  showConfirmButton: true,
                  confirmButtonText:'Leido',
                  confirmButtonColor:'GREEN',
                  showCancelButton:true,
                  cancelButtonText:'Cancelar',
                  cancelButtonColor:'RED',
                  allowEscapeKey : false,
                  allowOutsideClick: false
                }).then((result) => {
                 
                  if (!result.isConfirmed) {
                    Swal.fire('Es necesario confirmar lectura del mensaje', '', 'info')
                    .then((result) => {
                      if (result.isConfirmed) {
                        this.authService.logout().subscribe(
                          res => {
                            document.location.reload();
                          }
                        );
                      }
                      
                    });
                  } else{
                    let data: any={
                      'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                      'message_id':message.id
                    }
                    this.messagesService.ReadMessage(data).subscribe((res)=>{
                      console.log(res);
                    });
                    Swal.fire('Confirmación de lectura enviada', '', 'success');
                  }
                });
              }else if(message.type==='O'){
                Swal.fire({
                  title: message.name,
                  html: message.message,
                  width:'70%',
                  inputPlaceholder:'Acepto',
                  input:'checkbox',
                  confirmButtonText:'Firmar',
                  allowEscapeKey : false,
                  allowOutsideClick: false,
                  preConfirm(inputValue) {
                    if (inputValue === null) return false;
                    if (inputValue === 0) {
                      Swal.showValidationMessage('Debe aceptar y firmar');
                      return false;
                    }
                  },
                }).then((result)=>{
                  if (!result.isConfirmed) {
                    Swal.fire('Es necesario firmar el consentimiento', '', 'info')
                    .then((result) => {
                      if (result.isConfirmed) {
                        this.authService.logout().subscribe(
                          res => {
                            document.location.reload();
                          }
                        );
                      }
                    });
                  } else{
                    let data: any={
                      'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                      'message_id':message.id,
                      'text':Constant.AUTH.getUser()?.firstname.toUpperCase() +' '+Constant.AUTH.getUser()?.lastname.toUpperCase()
                    }
                    this.messagesService.ReadMessage(data).subscribe((res)=>{
                      console.log(res);
                    });
                    Swal.fire('Aceptacion y firma enviada', '', 'success');
                  }

                });
              }else if(message.type==='I'){
                Swal.fire(
                  { 
                    title:message.title,
                    html:message.message,
                    width:'70%',
                    icon:"info",
                    timer:1000*30,
                    timerProgressBar:true
                  }).then(() => {
                    
                    let data: any={
                      'user_email':Constant.AUTH.getUser()?.email.toUpperCase(),
                      'message_id':message.id
                    }
                    this.messagesService.ReadMessage(data).subscribe((res)=>{
                      console.log(res);
                    });
                  
                  });;
              }
                });
              },error:(err)=>{
                console.log(err)
              }
            }
          );
        }
      }
    });  
    
  }

}
