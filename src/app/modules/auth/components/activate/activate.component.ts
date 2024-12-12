import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/core/helper.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  sub: any;
  Steep : number = 1;
  constructor(private authService : AuthService,
     private activatedRoute: ActivatedRoute,
      private helper: HelperService, private router:Router, private cdr : ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('llego');
    
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params.token) {  this.findAndActivate(params.token); }
    })
  }
  findAndActivate(token:string){
    this.authService.findAndActivate(token).subscribe(
      res => {
        this.Steep = 2;
        this.cdr.detectChanges();
        this.helper.onSuccess('Genial, tu cuenta ha sido verificada, ya puedes acceder a mas contenido');
      },
      err => {
        this.helper.onError('Nos confundimos, Al parecer ya se ha usado este link, si crees que es un error contacta al administrador');
        this.router.navigate(['/auth/login']);
      }
    );

    
  }
  goToBack(){
    this.router.navigate(['/auth/login']);

  }
}
