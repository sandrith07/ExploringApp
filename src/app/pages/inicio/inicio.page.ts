import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor() {

    this.comprobarSesion()

   }
  accion = 'iniciar';
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

      this.getEvents();
    })
  }

  getEvents(){
    firebase.database().ref('/eventos').once('value', (eventos)=>{
      if(eventos.exists()){
        console.log('eventos consultados ', eventos.val())

      }else{
        console.log('no existen eventos aun ')
      }
    },(error)=>{
      console.log('courrio un error -> ', error)
    })
  }

  setEvents(){
    firebase.database().ref('/eventos').push({
      nombre: 'Feria del Dulce'
    })
  }

}
