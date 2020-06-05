import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor() { 
    this.comprobarSesion();
  }

  ngOnInit() {}
  user
  datosUser

  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        console.log("usuario perfil",user);
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
  
  something= true;
  somethingP= true;

  accion

  trueclick(accion){
    if(accion=="updateD"){
      this.something = true;
    }else if(accion=="editD"){
      this.something = null;
      this.setDatosPersona();
    }else if(accion=="updateP"){
      this.somethingP = true;
    }else if(accion=="editP"){
      this.somethingP = null;
    }
  }

  nombre
  apellido

  setDatosPersona(){
     
    let user = firebase.auth().currentUser;
    let display;
    console.log("set datos", user.displayName);
    user.updateProfile({
      displayName: this.nombre,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() =>{
      // Update successful.
    
      firebase.database().ref('usuarios/'+user.uid).set({
        nombre: this.nombre,
        apellido: this.apellido,
 
      })
    }).catch((error) =>{
      console.log('actualizacion realizada con exiito =>',error);
    });    
}
}
