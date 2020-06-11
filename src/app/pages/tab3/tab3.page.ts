import { Component, OnInit, Input } from '@angular/core';
import { ToastController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular'
import { PopoverComponent } from '../../components/popover/popover.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
   accion = 'todos';
   reload= false;
    visible = false;
    negociosFavoritos;
    negocios;
    negociosTiempoReal;
   
  /*
  tema: Tema = {
    titulo: '',
    contenido: '',
    favorito: '',
  };*/

  constructor(
    private toastCtrl: ToastController,
    public popoverController: PopoverController,
    private router: Router,
    public alertController: AlertController,
    public navCtrl: NavController 

  ) {
   this.comprobarSesion();
   
  }

  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }

  consultarSitiosTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('usuarios/favoritos').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.negociosTiempoReal = datos.val()
        this.negociosFiltrados = Object.keys(this.negociosTiempoReal)
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




  consultarSitiosFavoritos(){
    console.log('entre a consulta tiempo real favoritos');

    firebase.database().ref('usuarios/'+this.user.uid+'/favorito').on('value', (datos)=>{
      console.log('entre a firebase consulta favoritos');
      console.log(this.user);
      if(datos.exists()){
        this.negociosFavoritos = datos.val()
        console.log(datos.val())
        
          this.negociosFiltrados = Object.keys(this.negociosFavoritos).reverse();
          console.log('sitios tiempo real  favoritos-', this.negociosFavoritos);


      }else{
        this.negociosFavoritos = {}
        this.negociosFavoritos = []
        console.log('sitios tiempo favoritos real favoritos vacios');
        
      }
    },(erro)=>{
      this.negociosFavoritos = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de sitios ', erro);
      
    })
  }



  user
  filtro
  negociosFiltrados
  filtrarNegocios(){
    if(!this.filtro || this.filtro == ""){
      this.negociosFiltrados = Object.keys(this.negociosFavoritos || {})
    }else if(this.filtro != ""){
      this.negociosFiltrados = this.keys(this.negociosFavoritos).filter((negocio) => (this.negociosFavoritos[negocio].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase())).reverse();

    }
  }

 
  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
        console.log("usuario",this.user.uid);
        this.consultarSitiosFavoritos();
        
        
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

  toggleDelete(negocio) {
    if(this.user){
     console.log('Id del negocio', negocio)
     firebase.database().ref('usuarios/'+this.user.uid+ '/favorito/'+negocio).remove()
     this.negociosFiltrados={};
     this.negociosFiltrados = Object.keys(this.negociosFavoritos).reverse();
     console.log('sitios tiempo real  favoritos-', this.negociosFavoritos);
     this.showToast('eliminado');
    }else{
     this.alertNoFavoritos();
    }
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
 

}


