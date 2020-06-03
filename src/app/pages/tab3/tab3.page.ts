import { Component, OnInit } from '@angular/core';
import { ToastController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular'
import { PopoverComponent } from '../../components/popover/popover.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
   accion = 'todos';
  visible = false;
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

  ) {}

  toggle() {
   this.visible = !this.visible;
   if(this.visible === false){
    this.showToast('eliminado');
   }else if(this.visible === true){
    this.showToast('Añadido');
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

  async presentPopover(evento) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {

      },
      cssClass: 'my-custom-class',
      event: evento,
      translucent: true
    });
    return await popover.present();
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

}


