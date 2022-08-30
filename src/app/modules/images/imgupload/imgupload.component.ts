import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Constant } from 'src/app/shared/constant';

@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.scss']
})
export class ImguploadComponent implements OnInit {

  control : FormControl  = new FormControl('', [Validators.required])
  clients : Array<any> = Constant.AUTH.getUser()?.agencies;

  constructor() { }

  ngOnInit(): void {
  }

}
