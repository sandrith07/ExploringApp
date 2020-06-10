import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, iosTransitionAnimation } from '@ionic/angular';  
import { PopoverComponent } from '../popover/popover.component';
import * as firebase from 'firebase';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;
  @Input() tipoHeader: string;
  constructor(private popoverController:PopoverController) {
    this.comprobarSesion();
   }

  ngOnInit() {}

 
  async presentPopover(eve) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps:{},
      cssClass: 'my-custom-class',
      event: eve,
      mode: 'md',
      translucent: true
    });
    popover.onWillDismiss().then(()=>{})
    popover.onDidDismiss().then(()=>{})
    return await popover.present();
  }

  user
  tipoUSer
  datosUser

  comprobarSesion(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //usuario logueado
        this.user = user;
        this.user['administrador'] = false;
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
    firebase.database().ref('administradores/'+ this.user.uid).once('value', (datos)=>{
      if(datos.exists()){
        this.user['administrador'] = true;
      }else{
        this.user['administrador'] = false;
      }
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
  cerrarSesion(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

}
