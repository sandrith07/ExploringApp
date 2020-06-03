import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
    
  constructor(public alertController: AlertController) { }
  accion = 'iniciar';

  ngOnInit() {}

  user
  correo
  contrasena
  nombre
  apellido
  genero

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
    apellido: this.apellido,
    genero: this.genero,    
  })
}).catch((error) =>{
  console.log('actualizacion realizada con exiito =>',error);
});

      
    }).catch((erro)=>{
      this.alertCuentaDuplicada();
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

  async alertCuentaDuplicada() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error al crear cuenta',
      message: '<strong>Ya existe un usuario con las mismas credenciales</strong>!!!',
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
