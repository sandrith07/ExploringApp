import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-eventos',
  templateUrl: './registrar-eventos.page.html',
  styleUrls: ['./registrar-eventos.page.scss'],
})
export class RegistrarEventosPage implements OnInit {

  constructor(public alertController: AlertController, public navCtrl: NavController) {
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
  lugar
  direccion
  fechainicio
  fechafin
  telefono
  responsable
  keyEvento

  registrarEventos(){
    
    let rutaEvento = firebase.database().ref('/eventos') // ruta, tener en cuenta para consultas en tiempo real
    this.keyEvento = rutaEvento.push().key // llave primaria de evento

    rutaEvento.child(this.keyEvento).set({ /// ruta -> '/eventos/-kfbakjbasdkb/{datos}'
    "nombre": this.nombre,
    "descripcion": this.descripcion,
    "direccion": this.direccion,
    "lugar": this.lugar,
    "telefono": this.telefono,
    "responsable": this.responsable,
    "fechainicio": this.fechainicio,
    "fechafin": this.fechafin,
    }).then(async ()=>{
          //llamar a guardar archivo
          await this.subirArchivo()

    }).catch((error) =>{
      console.log('ocurrio un error al intentar crear un evento =>',error);
      this.alertEventoNoGuardado()
    });
    this.alertEventoGuardado();
    this.abrirSalirPagina();
  }
  abrirSalirPagina(){
    this.navCtrl.navigateForward('/tabs/ultimas-noticias');
  }

  limpiar(){
    this.nombre = null;
    this.descripcion = null;
    this.direccion = null;
    this.fechainicio =null;
    this.fechafin = null;
    this.rutaArchivo = null;
    this.telefono = null;
    this.responsable = null;
  }

  

  async alertEventoGuardado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Evento Guardado',
      message: '<strong>El evento ha sido guardado exitosamente</strong>!!!',
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

  async alertcompletar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'campos vacios',
      message: 'Todos los campos deben estar diligenciados',
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
    /**
     * 0. registrar evento en database
     * 1. obtener el id del evento
     * 2. crear la tarea para subir el archivo
     * 3. obtener la ruta del archivo subido
     * 4. actualizar la info del evento en la base de datos
     */

    let extension = this.archivo[0].type.split('/').slice(-1)[0];
      console.log('extension ', extension);

    let tareaSubirArchivo =  firebase.storage().ref('/imagenes/eventos/'+this.keyEvento+'/perfil.'+extension).putString(this.rutaArchivo, 'data_url');

    await tareaSubirArchivo.on('state_changed',(progreso)=>{
      // codigo a utilizar con la carga
      this.pro = (progreso.bytesTransferred / progreso.totalBytes) * 100
 
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

         firebase.database().ref('eventos/'+this.keyEvento+'/urlImagen').set(this.urlDescargaArchivo)
         this.limpiar()

         //4.2 actualizar varias rutas a la vez 
         /* let updates = {}

          updates['eventos/'+this.keyEvento+'/urlImagen'] = this.urlDescargaArchivo
          updates['hola/'+this.keyEvento+'/urlImagen'] = this.urlDescargaArchivo
          updates['hola2/'+this.keyEvento+'/urlImagen'] = this.urlDescargaArchivo
          updates['hola3/'+this.keyEvento+'/urlImagen'] = this.urlDescargaArchivo




         firebase.database().ref().update(updates).then(()=>{
           console.log("datos actualizados correctamente");

         }).catch((erro)=>{
           console.log('error al actualizar todas las tablas');

         })*/

      });

    })

  }
  pro

}
