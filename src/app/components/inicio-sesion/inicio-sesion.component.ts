import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
    
  constructor() { }
  accion = 'iniciar';

  ngOnInit() {}

  user

  correo
  contrasena
  nombre
  registro(){
    firebase.auth().createUserWithEmailAndPassword(this.correo,this.contrasena).then((usuario)=>{
      console.log(' registro exitoso ', usuario);
      
      let user = firebase.auth().currentUser;

user.updateProfile({
  displayName: this.nombre,
  // photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() =>{
  // Update successful.

  firebase.database().ref('usuarios/'+user.uid).set({
    nombre: this.nombre,
    correo: this.correo,

  })
}).catch((error) =>{
  // An error happened.
});

      
    }).catch((erro)=>{
      console.log('ocurrio un error al intentar crear cuenta =>',erro);
      
    })

    
  }

  registroConGoogle(){
    
  }


  login(){
    firebase.auth().signInWithEmailAndPassword(this.correo,this.contrasena).then((datos)=>{
          console.log(' registro exitoso ', datos);
          
    }).catch((erro)=>{
      console.log('ocurrio un error al intentar iniciar sesion =>',erro);
      
    })
  }


}
