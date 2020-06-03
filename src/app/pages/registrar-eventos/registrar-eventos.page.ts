import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-eventos',
  templateUrl: './registrar-eventos.page.html',
  styleUrls: ['./registrar-eventos.page.scss'],
})
export class RegistrarEventosPage implements OnInit {

  constructor(public alertController: AlertController) { 
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
      this.alertEventoNoGuardado()
    });
  }

  async alertEventoGuardado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Evento Guardado con Exito',
      message: '<strong>Ha ocurrido un error al intentar publicar el evento, por favor intente más tarde</strong>!!!',
      buttons: [
       {
          text: 'Ok',
          handler: () => {
            console.log('Confirmar Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async alertEventoNoGuardado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error al publicar un evento',
      message: '<strong>Ha ocurrido un error al intentar publicar el evento, por favor intente más tarde</strong>!!!',
      buttons: [
       {
          text: 'Ok',
          handler: () => {
            console.log('Confirmar Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
