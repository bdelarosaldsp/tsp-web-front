import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
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
    });
  }

  submit() {
    this.hasError = false;
    this.cdr.detectChanges();
    if (this.Steep == 1) {
      const loginSubscr = this.authService.preLogin(this.form.value)
      .subscribe({
        next: (res)=>{
          if (res.data.user) {
            this.user = res.data?.user;
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
      const loginSubscr = this.authService.login(this.form.value)
      .subscribe({
        next: (res)=>{
          console.log(res)
          if (res) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        },
        error: (err)=>{
          this.message = err.error?.data?.message ? err.error?.data?.message : 'Error en inicio de session';

          this.hasError = true
          console.log(err)
        }
      })
    this.unsubscribe.push(loginSubscr);
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
