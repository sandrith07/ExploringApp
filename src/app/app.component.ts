import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController} from '@ionic/angular';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
  const { PushNotifications } = Plugins;

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
export class AppComponent  implements OnInit{

  tok;

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
    private toastCtrl: ToastController
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

 ngOnInit() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

 

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        this.showToast();
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        
      }
    );
}

  user
  tipoUSer
  datosUser

  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        this.consultarDatosUser()
        this.getTipoUsuario();
        console.log('usuarios logueado');

           // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
      
          console.log("notificacion token", token.value);
          
          firebase.database().ref('/subscripciones/eventos/'+ token.value).set(true);
          this.tok= token.value;
        }
      );

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

    
  consultarDatosUser(){
    console.log('entre a consulta tiempo real datos usuario');

    firebase.database().ref('usuarios/'+this.user.uid).on('value', (datos)=>{
      console.log('entre a firebase consulta usuarios');
      console.log(this.user);
      if(datos.exists()){
        this.datosUser = datos.val()
        
        console.log('sitios tiempo real datos p-', this.datosUser.nombre);
   


      }else{
        this.datosUser = {}
        this.datosUser = []
        console.log('sitios tiempo favoritos real datos vacios');
        
      }
    },(erro)=>{
      this.datosUser = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de sitios ', erro);
      
    })
  }

  cerrarSesion(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  async showToast(){
    
      await this.toastCtrl.create({
        message: 'Se ha publicado un nuevo evento',
        duration: 900,
        position: 'middle'
      }).then(res => res.present());
  }
}
