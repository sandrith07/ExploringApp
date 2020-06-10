import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators } from '@angular/forms';
import { ToastController} from '@ionic/angular';
import { NegocioPageModule } from './negocio.module';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.page.html',
  styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {

  negocios
  negociosTiempoReal
  negociosFavoritos

  constructor(private toastCtrl: ToastController,public alertController: AlertController){
    this.comprobarSesion(),
    this.consultarSitiosTiempoReal()
  }

  ngOnInit(){
  }

  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }

  consultarNegociossEstactico(){
    console.log('entre a consulta estatica');
    
    firebase.database().ref('negocios').once('value', (datos)=>{
      if(datos.exists()){
        this.negocios = datos.val()
        console.log('sitios estaticos -', this.negocios);
        
      }else{
        this.negocios = {}
        console.log('sitios estaticos vacios');
        
      }
    })


  }

  consultarSitiosTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('negocios').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.negociosTiempoReal = datos.val()
        this.negociosFiltrados = Object.keys(this.negociosTiempoReal).reverse();
        console.log('sitios tiempo real -', this.negociosTiempoReal);

      }else{
        this.negociosTiempoReal = {}
        this.negociosFiltrados = []
        console.log('sitios tiempo real vacios');
        
      }
    },(erro)=>{
      this.negociosTiempoReal = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de sitios ', erro);
      
    })
  }

  filtro
  negociosFiltrados
  filtrarNegocios(){
    if(!this.filtro || this.filtro == ""){
      this.negociosFiltrados = Object.keys(this.negociosTiempoReal || {})
    }else if(this.filtro != ""){
      this.negociosFiltrados = this.keys(this.negociosTiempoReal).filter((negocio) => (this.negociosTiempoReal[negocio].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase())).reverse();

    }
  }
  

 

  visible = false;
  uid;
  nombre;
  descripcion;
  direccion;
  tipo;
  imagen;
  user



   comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        console.log("usuario",this.user.uid);
         
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

   toggleAdd(negociod, negocio) {
   if(this.user){
    console.log('Id del negocio', negocio)
    console.log('datos del negocio', negociod);
    firebase.database().ref('usuarios/'+this.user.uid+ '/favorito/').push({
      "direccion": negociod.direccion,
      "tipo": negociod.tipo,
      "nombre": negociod.nombre,
      "imagen": negociod.imagen

    })
    this.showToast('Añadido');
   }else{
    
    this.alertNoFavoritos();

   }
   }

   toggleDelete(negociod, negocio) {
    if(this.user){
     console.log('Id del negocio', negocio)
     console.log('datos del negocio', negociod);
     firebase.database().ref('usuarios/'+this.user.uid+ '/favorito/').set({
       "direccion": false,
       "tipo": false,
       "nombre": false,
       "imagen": false
 
     })
     this.showToast('eliminado');
    }else{
     
     this.alertNoFavoritos();
 
    }
    }

   async alertNoFavoritos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No puede añadir favoritos',
      message: '<stron>Para acceder a esta funcionalidad, debes Iniciar Sesión o Registrarte</stron>',
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
 
   async  showToast(estado : any){
     if(estado === 'eliminado'){
       await this.toastCtrl.create({
         message: 'Eliminado de favoritos',
         duration: 900,
         position: 'middle'
       }).then(res => res.present());
     }else{
       await this.toastCtrl.create({
         message: 'Añadido a favoritos',
         duration: 900,
         position: 'middle'
       }).then(res => res.present());
     }
   }

}
