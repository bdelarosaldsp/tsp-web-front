import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { SignupResponse } from 'src/app/models/response/signup-response';
import { HelperService } from 'src/app/services/core/helper.service';
import { IdentificationTypesService } from 'src/app/services/identification-types.service';
import { IdentificationType } from 'src/app/models/identification-type';
import { ToastrService } from 'ngx-toastr';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  Steep : number = 1;
  hasError: boolean;
  errorState: any = {
    state: ErrorStates.NotSubmitted,
    message: ''
  };
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  identificationTypes : Array<IdentificationType>;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private helper : HelperService,
    private router: Router,
    private toastr : ToastrService,
    private identificationTypeService : IdentificationTypesService
  ) {
     this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.getIdentificationTypes();
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  getIdentificationTypes(){
    
    this.identificationTypeService.getActives().subscribe(
      res => {
        this.identificationTypes = res.data;
      }
      
    )
  }
  
  initForm() {
    this.registrationForm = this.fb.group(
      {
        firstname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100) ]) ],
        lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100) ]) ],
        email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3),Validators.maxLength(320), ]) ],
        password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15),]) ],
        password_confirmation: ['',Validators.compose([ Validators.required, Validators.minLength(3),  Validators.maxLength(100)]) ],
        identification_number: ['', Validators.compose([Validators.required])],
        identificationtype_id: ['', Validators.compose([Validators.required])],

      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {


    this.hasError = false;
    
    this.authService
      .singUp(this.registrationForm.value)
      .subscribe((res: SignupResponse) => {
        if (res.data.user) {
          this.errorState = {
            state: ErrorStates.NoError,
            message: res.data.message
          }
          this.Steep = 2;
          this.helper.onSuccess(res.data.message)
        
        }
      },(err : any) => {
        console.log(err);
        this.toastr.warning(err.errors[0]? err.errors[0] : "Hubo un error al intentar registrarse", err.code? err.code : 'Datos invalidos')
                
        this.errorState = {
          state: ErrorStates.HasError,
          message:  err.error?.data?.message ? err.error?.data?.message :"Hubo un error al intentar registrarse"
        }
        this.hasError = true;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  goToBack(){
    console.log('back');
    
    this.router.navigate(['/']);
  }
}

