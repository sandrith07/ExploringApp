import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Musica } from 'src/app/interfaces/musica.interface';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import * as firebase from 'firebase';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.page.html',
  styleUrls: ['./musica.page.scss'],
})
export class MusicaPage implements OnInit {

  musica: Musica = {
    nombre: '',
    album: '',
    artista: '',
    imagen: '',
    link: '',
    tipo: '',
  };

  musicas
  musicasTiempoReal
  music
  musicaCargada: Musica[];
  musicaClasicaFiltrada

  filtro
  musicaFiltrada

  constructor() {
    this.consultarCancionesTiempoReal(),
    this.filtrarClasica()
  }

  ngOnInit() {
  }

  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }

  keysOrderDesc(objeto: Object){
    return Object.keys((objeto || {})).reverse();
  }

  consultarCancionesTiempoReal(){
    firebase.database().ref('musica').on('value', (datos)=>{

      if(datos.exists()){
        this.musicasTiempoReal = datos.val()
        this.musicaFiltrada = Object.keys(this.musicasTiempoReal).reverse();
      }else{
        this.musicasTiempoReal = {}
        this.musicaFiltrada = []
      }
    },(erro)=>{
      this.musicasTiempoReal = {}
    })
  }

  filtrarCanciones(){
    if(!this.filtro || this.filtro == ""){
      this.musicaFiltrada = Object.keys(this.musicasTiempoReal || {})
    }else if(this.filtro != ""){
      this.musicaFiltrada = this.keys(this.musicasTiempoReal).filter((musica) => (this.musicasTiempoReal[musica].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase())).reverse();

    }
  }

  clasica = "clasica";
  filtrarClasica(){
    console.log('entre_al_metodo');
    this.musicaClasicaFiltrada = this.keys(this.musicasTiempoReal).filter((musica) => (this.musicasTiempoReal[musica].tipo).toString().toLowerCase().includes((this.clasica).toString().toLowerCase())).reverse();
    console.log('esta es la musica filtrada', this.musicaClasicaFiltrada);
  }

}
