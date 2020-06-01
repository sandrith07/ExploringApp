import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-eventos',
  templateUrl: './registrar-eventos.page.html',
  styleUrls: ['./registrar-eventos.page.scss'],
})
export class RegistrarEventosPage implements OnInit {

  constructor() { 
    this.comprobarSesion()
  }

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

  nombre

  descripcion
  direccion
  fechainicio
  fechafin
  
  registrarEventos(){
    firebase.database().ref('/eventos').push({
    "nombre": this.nombre,
    "descripcion": this.descripcion,
    "direccion": this.direccion,
    "fechainicio": this.fechainicio,
    "fechafin": this.fechafin,
    
    
    }).catch((error) =>{
      console.log('ocurrio un error al intentar crear un evento =>',error);
    });
  
  }


}
