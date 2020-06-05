import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
    
  constructor(public alertController: AlertController) {
    this.comprobarSesion();
   }
  accion = 'iniciar';

  ngOnInit() {}

  user
  correo
  contrasena
  nombre
  apellido
  genero

  registro(){
    if(this.correo !=null || this.contrasena != null || this.nombre != null || this.apellido !=null || this.genero !=null){
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
  
    }else{
      this.alertDatosLimpios();
    }    
  }

  registroConGoogle(){
    
  }


  login(){
  if(this.correo !=null || this.contrasena != null ){
    firebase.auth().signInWithEmailAndPassword(this.correo,this.contrasena).then((datos)=>{
      console.log(' registro exitoso ', datos);
      
    }).catch((erro)=>{
    console.log('ocurrio un error al intentar iniciar sesion =>',erro);
    this.alertDatosIncorrectos();
  
  })
  }else{
    this.alertDatosLimpios();
  }
  }

  async alertDatosLimpios() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Campos Vacios',
      message: '<strong>Verifique que los campos esten llenos</strong>!!!',
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

  async alertDatosIncorrectos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error al iniciar sesión',
      message: '<strong>Usuario o contraseña incorrecta</strong>!!!',
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
  
  public limpiarForm(){
    this.user = null
    this.correo= null
    this.contrasena= null
    this.nombre= null
    this.apellido= null
    this.genero= null
  }

  email;
  public handleEmailCalue(event) {
    this.email = event.target.value;
  }

}
