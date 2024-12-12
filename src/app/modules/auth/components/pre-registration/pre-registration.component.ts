import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-registration',
  templateUrl: './pre-registration.component.html',
  styleUrls: ['./pre-registration.component.scss']
})
export class PreRegistrationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToBack(){
    console.log('back');
    
    this.router.navigate(['/']);
  }
}
