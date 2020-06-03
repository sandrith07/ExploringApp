import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

const firebaseConfig = {
    apiKey: "AIzaSyCBAR8zYU6jsyJ6BQdiMUrfW6bXd0uMXJ8",
    authDomain: "explorinapp-c07f5.firebaseapp.com",
    databaseURL: "https://explorinapp-c07f5.firebaseio.com",
    projectId: "explorinapp-c07f5",
    storageBucket: "explorinapp-c07f5.appspot.com",
    messagingSenderId: "96935232733",
    appId: "1:96935232733:web:1b82503650c29a6dd0c734"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {title: 'Perfil',         url: '/tabs/eventos',           icon: '/assets/icon calendar.svg'},
    {title: 'Favoritos',         url: '/tabs/eventos',           icon: '/assets/icon calendar.svg'},
    {title: 'PlayList',         url: '/tabs/eventos',           icon: '/assets/icon calendar.svg'},
    {title: 'Restaurantes',         url: '/tabs/eventos',           icon: '/assets/icon calendar.svg'},
    {title: 'Discotecas',         url: '/tabs/eventos',           icon: '/assets/icon calendar.svg'},
    {title: 'Hoteles',         url: '/tabs/eventos',           icon: '/assets/icon calendar.svg'},

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }


    this.initializeApp();

    this.comprobarSesion()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  user
  tipoUSer

  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        this.getTipoUsuario();
        console.log('usuarios logueado');

      }else{
        // usuario con sesion no activa
        this.user = null
        console.log('usuario no logueado');
        
      }
    })
  }



  public getTipoUsuario(){
    firebase.database().ref('administradores/'+ this.user.uid).once('value', (datos)=>{
      if(datos.exists()){
        this.user['administrador'] = true;
      }else{
        this.user['administrador'] = false;
      }
    })
  }

  cerrarSesion(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
}
