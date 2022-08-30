import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-asotiation',
  templateUrl: './qr-asotiation.component.html',
  styleUrls: ['./qr-asotiation.component.scss'],
})
export class QrAsotiationComponent implements OnInit {
  image: any;
  form: FormGroup;
  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      code: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getQr();
  }
enable(){
  if (this.form.invalid) {
    return ;
  }
  this.auth.enable2fa(this.form.value).subscribe(
    res => {
      console.log(res);
      this.router.navigate(['/home']);
    }
  )
}
  getQr() {
    this.auth.getQr().subscribe((res) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(res.data, 'text/xml');

      this.image = this.sanitizer.bypassSecurityTrustHtml(res.data);
      console.log(this.image);
      this.cdr.detectChanges();
    });
  }
}
