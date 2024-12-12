import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';
import { Constant } from 'src/app/shared/constant';
import { TranslationService } from '../../../../../../modules/i18n';
import { MatDialog } from '@angular/material/dialog';
import { AgencyModalComponent } from 'src/app/modules/shared/modals/agency-modal/agency-modal.component';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  agency : any = JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.agency)!);
  language: LanguageFlag;
  user$: Observable<Account>;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private translationService: TranslationService,
    private dialog : MatDialog,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$ = of(Constant.AUTH.getUser()) ;
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    this.auth.logout().subscribe(
      res => {
        document.location.reload();
      }
    );
   
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }
  selectAgency(){
    const dialogRef = this.dialog.open(AgencyModalComponent, {
      width: '400px',
      data : {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      
        this.agency = JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.agency)!);
        this.cdr.detectChanges();
      
    });
  
  }
  getAgency(){
    return   JSON.parse(localStorage.getItem(Constant.AUTH.KEYS.agency)!);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
