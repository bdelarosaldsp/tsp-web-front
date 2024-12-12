import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  user:Account;
  
  constructor() {}

 

  ngOnInit(): void {
    this.user=Constant.AUTH.getUser();
  }
}
