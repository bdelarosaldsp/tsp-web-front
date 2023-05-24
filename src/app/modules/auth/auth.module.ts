import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { QrAsotiationComponent } from './components/qr-asotiation/qr-asotiation.component';
import { ActivateComponent } from './components/activate/activate.component';
import { PreRegistrationComponent } from './components/pre-registration/pre-registration.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    ResetPasswordComponent,
    QrAsotiationComponent,
    ActivateComponent,
    PreRegistrationComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule
  ],
})
export class AuthModule {}
