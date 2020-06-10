import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {PopoverController} from '@ionic/angular';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popover:PopoverController) {
    this.comprobarSesion()
   }

  ngOnInit() {}
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
    this.popover.dismiss();
  }
}
