import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  errorState: any = {
    state: ErrorStates.NotSubmitted,
    message: ''
  };
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
     this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((params) =>{
      this.findByToken(params['token'])
    })
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password_confirmation: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      user_id: [null],
      token: [null]
    });
  }

  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authService
      .reset_password(this.resetPasswordForm.value)
      .pipe(first())
      .subscribe((res: any) => {
        console.log("LA RESPUESTA",res)
        this.errorState = {
          state: ErrorStates.NoError,
          message: res.data.message
        };
      },err=>{
        this.errorState = {
          state: ErrorStates.HasError,
          message: 'Error al intentar restablecer la contraseña'
        };
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }

  findByToken(token: string): void{

    
    const findByTokenSubscr = this.authService
    .RESET_PASSWORD_FIND(token)
    .pipe(first())
    .subscribe((res: any) => {
      this.resetPasswordForm.controls['user_id'].setValue(res.data.user_id)
      this.resetPasswordForm.controls['token'].setValue(res.data.token)
      console.log("USUARIO",res)
      console.log(this.resetPasswordForm.value)
      });
    this.unsubscribe.push(findByTokenSubscr);
  }
}
