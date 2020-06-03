import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  constructor(private route: ActivatedRoute ) {
    this.comprobarSesion()
   }
  tipo="detalleT"
  evento
  ngOnInit() {
   let id= this.route.snapshot.paramMap.get('id');
   firebase.database().ref('/eventos/'+ id).once('value',(datos)=>{
    if(datos.exists()){
      this.evento = datos.val();
    }else{
      this.evento = null;
    }
   })
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
