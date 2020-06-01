import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-ultimas-noticias',
  templateUrl: './ultimas-noticias.page.html',
  styleUrls: ['./ultimas-noticias.page.scss'],
})
export class UltimasNoticiasPage implements OnInit {

  constructor() { }
  accion="dejar"
  ngOnInit() {
  }

  user
  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user
        console.log('usuarios logueado');
  
      }else{
        // usuario con sesion no activa
        this.user = null
        console.log('usuario no logueado');
        
      }
    })
  }

}
