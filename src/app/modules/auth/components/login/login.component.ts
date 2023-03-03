import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/services/general.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Constant } from 'src/app/shared/constant';
import Swal from 'sweetalert2' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  active:string;
  external:string;
  user : Account;
  form: FormGroup;
  message : string;
  hasError: boolean;
  returnUrl: string;
  qrImage: any;
  isLoading$: Observable<boolean>;
  Steep : number = 1;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private messagesService: MessagesService,
    private genService: GeneralService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = this.fb.group({
      email: [,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      code: ['',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      ],
      nitcli:['']
    });
  }

  submit() {
    this.hasError = false;
    this.cdr.detectChanges();
    if (this.Steep == 1) {
      this.form.value.email=this.form.value.email.toString().toUpperCase();
      const loginSubscr = this.authService.preLogin(this.form.value)
      .subscribe({
        next: (res)=>{
          if (res.data.user) {
            this.user = res.data?.user;
            this.external=res.data?.webusr?.vus_tipusr;
            this.active=res.data?.user?.active;
            this.qrImage = this.sanitizer.bypassSecurityTrustHtml(res.data?.qr_code);
            this.Steep = 2;
            this.form.controls["code"].setValidators(Validators.required);
            this.cdr.detectChanges();
          }
          console.log(res)
                  
        },
        error: (err)=>{
          this.message = err.error?.data?.message ? err.error?.data?.message : 'Error en inicio de session';
          this.hasError = true;
          console.log(err)
        }
      })
    this.unsubscribe.push(loginSubscr);
    }
    if (this.Steep == 2) {
      if(this.external==='3' && this.active==='0'){
        Swal.fire({
          title: 'VALIDACIÓN DE USUARIO EXTERNO',
          inputLabel:'Digite e nit de su empresa:',
          input:'text',
          confirmButtonText:'Validar',
          allowEscapeKey : false,
          allowOutsideClick: false,
          preConfirm(inputValue) {
            if (inputValue === null) return false;
            if (inputValue === '') {
              Swal.showValidationMessage('Debe digitar el nit');
              return false;
            }
          },
        }).then((result)=>{
          if (!result.isConfirmed) {
            Swal.fire('Es necesario digitar el nit de su empresa', '', 'info')
            .then((result) => {
              
              this.authService.logout().subscribe(
                res => {
                  document.location.reload();
                }
              );
              
            });
          } else{
            this.form.value.email=this.form.value.email.toString().toUpperCase();
            this.form.value.nitcli=result.value;
            const loginSubscr = this.authService.login(this.form.value)
            .subscribe({
              next: (res)=>{
                
                if (res) {
                  //this.genService.getMantenimiento('0000','',res.data?.user?.email);
                  
            
                  this.router.navigate([this.returnUrl]);
                }
              },
              error: (err)=>{
                console.log(err);
                this.message = err.error?.data?.message ? err.error?.data?.message : 'Error en inicio de session';

                this.hasError = true
              }
            });
            this.unsubscribe.push(loginSubscr);
          }

        });
      }else{
        this.form.value.email=this.form.value.email.toString().toUpperCase();
        const loginSubscr = this.authService.login(this.form.value)
        .subscribe({
          next: (res)=>{
            console.log(res)
            if (res) {
              //this.genService.getMantenimiento('0000','',res.data?.user?.email);
              
        
              this.router.navigate([this.returnUrl]);
            } 
          },
          error: (err)=>{
            this.message = err.error?.data?.message ? err.error?.data?.message : 'Error en inicio de session';

            this.hasError = true
            console.log(err)
          }
        });
        this.unsubscribe.push(loginSubscr);
      }
      
    
    }
  }
  getQr() {
    this.authService.getQr().subscribe((res) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(res.data, 'text/xml');

      this.qrImage = this.sanitizer.bypassSecurityTrustHtml(res.data);
      console.log(this.qrImage);
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
