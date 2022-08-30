import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-sign-in-method',
  templateUrl: './sign-in-method.component.html',
})
export class SignInMethodComponent implements OnInit, OnDestroy {
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  user : Account = Constant.AUTH.getUser();
  form : FormGroup;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private fb : FormBuilder, private authService : AuthService, private toastr: ToastrService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    this.form = this.fb.group({
      email: [this.user.email],
      new_password: ['', Validators.required],
      password: ['', Validators.required],
      new_password_confirmation: ['', Validators.required]
    }, {validator: matchingPasswords('new_password', 'new_password_confirmation')});
  }

  ngOnInit(): void {}

  toggleEmailForm(show: boolean) {
    this.showChangeEmailForm = show;
  }

  saveEmail() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.showChangeEmailForm = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  togglePasswordForm(show: boolean) {
    this.showChangePasswordForm = show;
  }

  savePassword() {
    if (this.form.invalid){
this.toastr.warning("Datos incorrectos");
      return;
    }
    this.isLoading$.next(true);
    this.authService.change_password(this.form.value).subscribe(
      res => {
        this.isLoading$.next(false);
        this.showChangePasswordForm = false;
        this.toastr.success("Contraseña cambiada exitosamente")
        this.cdr.detectChanges();
      },
      err => {
        console.log(err);
        
        this.isLoading$.next(false);
        let title = err.code ? err.code : 'Error en la solicitud';
        let message = err.error?.data?.errors?.password? err.error?.data?.errors?.password[0] :  "Tenemos un error, no es tu culpa, es nuestra, informanos!";
        this.toastr.warning(message, title)
        this.cdr.detectChanges();
      }
    )
   
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
      let password= group.controls[passwordKey];
      let passwordConfirmation= group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
          return passwordConfirmation.setErrors({mismatchedPasswords: true})
      }
  }
}