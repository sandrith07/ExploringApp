import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  constructor(private route: ActivatedRoute, public alertController: AlertController, public navCtrl: NavController ) {
    this.comprobarSesion()
   }
  tipo="detalleT"
  noticia
  idnoticia
  actualizar = 'false';
  something= true;
  ngOnInit() {
   let id= this.route.snapshot.paramMap.get('id');
   firebase.database().ref('/eventos/'+ id).once('value',(datos)=>{
    if(datos.exists()){
      this.noticia = datos.val();
    }else{
      this.noticia = null;
    }
   })

   console.log("id", id);
   this.idnoticia= id;
  }

  user
  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        console.log("usuario",this.user);
        
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

  nombre
  descripcion
  lugar
  direccion
  fechainicio
  fechafin
  telefono
  responsable
  keyEvento


  activarActualizarEvento(){
    this.actualizar= 'true';
    this.something = null;
  }

 eliminarEvento(){     
    firebase.database().ref('eventos/'+this.idnoticia).remove()
    this.alertEventoEliminado();
    this.abrirSalirPagina();
  }



  actualizarEvento(){     
    if(this.rutaArchivo){
      firebase.database().ref('eventos/'+this.idnoticia).set({
        nombre: this.noticia.nombre,
        descripcion: this.noticia.descripcion,
        lugar: this.noticia.lugar,
        direccion: this.noticia.direccion,
        fechainicio: this.noticia.fechainicio,
        fechafin: this.noticia.fechafin,
        telefono: this.noticia.telefono,    
        responsable: this.noticia.responsable,
        urlImagen : this.rutaArchivo,
      })
    }else{
      firebase.database().ref('eventos/'+this.idnoticia).set({
        nombre: this.noticia.nombre,
        descripcion: this.noticia.descripcion,
        lugar: this.noticia.lugar,
        direccion: this.noticia.direccion,
        fechainicio: this.noticia.fechainicio,
        fechafin: this.noticia.fechafin,
        telefono: this.noticia.telefono,    
        responsable: this.noticia.responsable,
        urlImagen : this.noticia.urlImagen,
      })
    }
    this.alertEventoActualizado();
    this.abrirSalirPagina();
  }

  abrirSalirPagina(){
    this.navCtrl.navigateForward('/tabs/ultimas-noticias');
  }

 

  async alertEventoEliminado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Evento Eliminado',
      message: '<strong>El evento ha sido eliminado exitosamente</strong>!!!',
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

  async alertEventoActualizado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Evento Actualizado',
      message: '<strong>El evento ha sido avtualizado exitosamente</strong>!!!',
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


}
