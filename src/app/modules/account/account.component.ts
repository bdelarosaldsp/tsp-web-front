import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  user:Account;

  constructor() {}

  ngOnInit(): void {
    this.user=Constant.AUTH.getUser();
  }
}
