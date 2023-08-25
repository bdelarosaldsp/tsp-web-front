import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';
import { UsersService } from 'src/app/services/users.service';
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
  base64textString:Array<string>=[];

  constructor(private cdr: ChangeDetectorRef, private sanitizer:DomSanitizer, private userService:UsersService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  imageSync(file :any ){

    this.base64textString=[];
    var reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (events: any) => {
      this.base64textString.push(events.target.result);
      this.cdr.detectChanges();
    };
  }

  getUrl(file:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }
  saveSettings() {
    this.isLoading$.next(true);
    console.log(this.base64textString.length)
    if(this.base64textString.length>0){
      let data={
        id:this.user.id,
        img:this.base64textString[0].toString()
      };
      this.userService.ChangeImg(data).subscribe({
        next:(res)=>{
          if(this.user.image!==null){
            this.user.image.user_img=res.data.user_img;
          }else{
            this.user.image={user_img:res.data.user_img};
            this.cdr.detectChanges();
            
          }
          
          localStorage.setItem(Constant.AUTH.KEYS.userData, JSON.stringify(this.user));
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          document.location.reload();
        },
        error:(err)=>{
          console.log(err);
          this.isLoading$.next(false);
          this.cdr.detectChanges();
        },
        complete:()=>{
          this.isLoading$.next(false);
          this.cdr.detectChanges();
        }
      });
    }else{
      setTimeout(() => {
        this.isLoading$.next(false);
        this.cdr.detectChanges();
      }, 1500);
    }
    
    
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
