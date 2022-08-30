import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// #fake-start#
import { ToastrModule } from 'ngx-toastr';
import { InterceptRequestsService } from './services/core/intercept-requests.service';
import { RoleGuard } from './services/core/role-guard';
import { AuthGuard } from './services/core/auth.guard';
import { DecimalPipe,   registerLocaleData } from '@angular/common';
import localesCo from "@angular/common/locales/es-CO";
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatToolbarModule} from '@angular/material/toolbar';

// #fake-end#


registerLocaleData(localesCo);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    RoleGuard,
    AuthGuard,
    InterceptRequestsService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptRequestsService,
      multi: true
    },
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: "es-CO" },
    DecimalPipe,
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
