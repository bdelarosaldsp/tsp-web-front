import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: '<body[root]>',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  data : any ;
  show = false;
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit(): void {
    document.body.classList.add('bg-white');
    this.http.get('https://my-json-server.typicode.com/josueverbel/apifaker/clients/3').subscribe(
      (res : any) => {
        if (res.message) {
          this.data =  this.sanitizer.bypassSecurityTrustHtml(res.message);
          this.show = true;          
        }
        
      });
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
}
