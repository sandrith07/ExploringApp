import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  accion = 'iniciar';

  ngOnInit() {}

  navegacion(){
  console.log('pre-registro');
  this.router.navigate(['/registrarse']);
  console.log('post-registro');
  }

  navegacionGoogle(){
  console.log('pre-registro');
  this.router.navigate(['/registro']);
  console.log('post-registro');
  }

}
