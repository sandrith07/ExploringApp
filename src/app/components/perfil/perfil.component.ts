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

  nombreImagenPerfil = ''
  imagePath
  imageURlOriginal
  rutaArchivo= null
  archivo

  seleccionarArchivo(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
   //if (mimeType.match(/image\/*/) == null) {
    //  this.message = "Only images are supported.";
    //  return;
    //}
 
    var reader = new FileReader();
    this.imagePath = files;
    console.log(' datos de archivo original file[0] -> ', files[0]);
    this.nombreImagenPerfil = files[0].name
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imageURlOriginal= reader.result;
      //this.modalPerfil(this.imageURlOriginal) 
      console.log("imagen ", this.imageURlOriginal);
      this.rutaArchivo= this.imageURlOriginal;
      console.log("imagen path", this.imagePath);
    }
  }

   async subirImage(){
    let extension = this.archivo[0].type.split('/').slice(-1)[0];
      console.log('extension ', extension);
    let taks = firebase.storage().ref('/imagenes/perfil');
    
  }

  
}
