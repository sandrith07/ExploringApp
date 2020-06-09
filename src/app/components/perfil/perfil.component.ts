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
  telefono

  setDatosPersona(){    
    let user = firebase.auth().currentUser;
    this.subirArchivo();
    firebase.database().ref('usuarios/'+this.user.uid).set({
      nombre: this.datosUser.nombre,
      correo: this.datosUser.correo,
      telefono: this.datosUser.telefono,
      genero: this.datosUser.genero,    
      urlImagen : this.datosUser.urlImagen,
    })
    this. setDatosAuth();
    console.log("datos persona", this.datosUser);
  }

  setDatosAuth(){
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.datosUser.nombre,
      photoURL:  this.datosUser.urlImagen,
    })
  }

  imagenlocal: string = "./assets/add-image.jpeg";
  imagenSubida: File = null;



  archivo
  nombreArchivo
  rutaArchivo
  
  seleccionarArchivo(files){
    if(files.length === 0) // si no selecciona nada 
      return
    
      let reader = new FileReader();
      this.archivo = files
      this.nombreArchivo = files[0].name

      reader.readAsDataURL(files[0]);

      reader.onload = ()=>{
        this.rutaArchivo = reader.result
        console.log(' ruta archivo => ',this.rutaArchivo);
        console.log('archivo ->' , this.archivo);
        //this.subirArchivo()
      }


  }

  //fin seleccionar archivo -------------------------------------

  urlDescargaArchivo

  async subirArchivo(){
    
    let extension = this.archivo[0].type.split('/').slice(-1)[0];
      console.log('extension ', extension);

    let tareaSubirArchivo =  firebase.storage().ref('/imagenes/usuarios/'+this.user.uid+'/perfil.'+extension).putString(this.rutaArchivo, 'data_url');

    await tareaSubirArchivo.on('state_changed',(progreso)=>{
      // codigo a utilizar con la carga
      
 
    },(erro)=>{
      console.log('ocurrio un error al cargar e larchivo ', this.nombreArchivo);
      console.log('detalle error ', erro);
    },()=>{
      // obtener la url del archivo subido
     // this.urlDescargaArchivo = tareaSubirArchivo.snapshot.downloadURL

      tareaSubirArchivo.snapshot.ref.getDownloadURL().then((downloadURL) =>{
       this.urlDescargaArchivo = downloadURL

        //console.log('File available at', downloadURL);
      console.log('ruta urll imagne ', this.urlDescargaArchivo );

        /**
         * 4.1 actualizar evento en la base de datos ... atributo ruta imagen
         * 4.2 actualizar evento en la base de datos con otro metodo... escritura en multiples rutas
         * 
         */

         //4.1 inicio ----------------------

         firebase.database().ref('usuarios/'+this.user.uid+'/urlImagen').set(this.urlDescargaArchivo)

      });

    })

  }
}
