import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { SitioTuristico } from 'src/app/interfaces/sitioturistico.interface';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import * as firebase from 'firebase';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sitios-turisticos',
  templateUrl: './sitios-turisticos.page.html',
  styleUrls: ['./sitios-turisticos.page.scss'],
})

export class SitiosTuristicosPage implements OnInit {

  sitio: SitioTuristico = {
    nombre: '',
    tipo: '',
    ubicacion: '',
    descripcion: '',
    imagen: '',

  };


  sitios 
  sitiosTiempoReal

  sitiopersonalCargo= null;

  sitioturistico: SitioTuristico[];

  constructor(){
    this.consultarSitiosEstactico()
    this.consultarSitiosTiempoReal()

  }

  ngOnInit(){
  }

  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }

  consultarSitiosEstactico(){
    console.log('entre a consulta estatica');
    
    firebase.database().ref('sitiosturisticos').once('value', (datos)=>{
      if(datos.exists()){
        this.sitios = datos.val()
        console.log('sitios estaticos -', this.sitios);
        
      }else{
        this.sitios = {}
        console.log('sitios estaticos vacios');
        
      }
    })


  }

  consultarSitiosTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('sitiosturisticos').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.sitiosTiempoReal = datos.val()
        this.sitiosFiltrados = Object.keys(this.sitiosTiempoReal)
        console.log('sitios tiempo real -', this.sitiosTiempoReal);

      }else{
        this.sitiosTiempoReal = {}
        this.sitiosFiltrados = []
        console.log('sitios tiempo real vacios');
        
      }
    },(erro)=>{
      this.sitiosTiempoReal = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de sitios ', erro);
      
    })
  }

  filtro
  sitiosFiltrados
  filtrarSitios(){
    if(!this.filtro || this.filtro == ""){
      this.sitiosFiltrados = Object.keys(this.sitiosTiempoReal || {})
    }else if(this.filtro != ""){
      this.sitiosFiltrados = this.keys(this.sitiosTiempoReal).filter((sitio) => (this.sitiosTiempoReal[sitio].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase()))

    }
  }
}
