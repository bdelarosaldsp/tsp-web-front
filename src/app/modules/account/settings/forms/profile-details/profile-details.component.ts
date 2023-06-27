import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  user : Account = Constant.AUTH.getUser();
  agency : any = Constant.AUTH.getAgency();
  private unsubscribe: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private sanitizer:DomSanitizer) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {}

  imageSync(file :any ){
    console.log(...file)
  }

  getUrl(file:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }
  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
