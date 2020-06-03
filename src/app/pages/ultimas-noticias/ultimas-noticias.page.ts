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

  constructor() {
    this.consultarNoticiaTiempoReal(),
    this.comprobarSesion()
   }
  accion="dejar"
  ngOnInit() {
  }

  user
  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        console.log("usuario",this.user);
        
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
    console.log("Get Tipo usuario");
    
    firebase.database().ref('/administradores/'+this.user.uid).once('value').then(
    (datos)=>{
      console.log("tipo de usuario: ", datos.val());
      if(datos.exists()){
        this.user['administrador'] = true;
      }else{
        this.user['administrador'] = false;
      }      
    }).catch((erro)=>{
      console.log('ocurrio error en tipo usuario ', erro);
    })
  }


  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }

  noticia
  noticiaTiempoReal
  
  consultarNoticiaTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('eventos').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.noticiaTiempoReal = datos.val()
        this.noticiaFiltrada = Object.keys(this.noticiaTiempoReal)
        console.log('eventos tiempo real -', this.noticiaTiempoReal);

      }else{
        this.noticiaTiempoReal = {}
        this.noticiaFiltrada = []
        console.log('eventos tiempo real vacios');
        
      }
    },(erro)=>{
      this.noticiaTiempoReal = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de eventos ', erro);
      
    })
  }

  filtro
  noticiaFiltrada

  filtrarNoticia(){
    if(!this.filtro || this.filtro == ""){
      this.noticiaFiltrada = Object.keys(this.noticiaTiempoReal || {})
    }else if(this.filtro != ""){
      this.noticiaFiltrada = this.keys(this.noticiaTiempoReal).filter((noticia) => (this.noticiaTiempoReal[noticia].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase()))

    }
  }


}
