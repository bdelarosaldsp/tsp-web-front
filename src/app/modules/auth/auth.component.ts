import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Endpoint } from 'src/app/shared/endpoints';

@Component({
  selector: '<body[root]>',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements  OnInit, OnDestroy {
  today: Date = new Date();
  data : any ;
  show = false;
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit(): void {
    document.body.classList.add('bg-white');
   
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
}
