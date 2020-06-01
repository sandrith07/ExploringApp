import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.page.html',
  styleUrls: ['./historia.page.scss'],
})
export class HistoriaPage implements OnInit {
 
  historias
  historiasTiempoReal


  constructor(){
    this.consultarHistoriasTiempoReal()
  }

  ngOnInit(){
  }

  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }



  consultarHistoriasTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('historia').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.historiasTiempoReal = datos.val()
        this.historiasFiltradas = Object.keys(this.historiasTiempoReal)
        console.log('historias tiempo real -', this.historiasTiempoReal);

      }else{
        this.historiasTiempoReal = {}
        this.historiasFiltradas = []
        console.log('historias tiempo real vacios');
        
      }
    },(erro)=>{
      this.historiasTiempoReal = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de sitios ', erro);
      
    })
  }

  filtro
  historiasFiltradas
  filtrarHistorias(){
    if(!this.filtro || this.filtro == ""){
      this.historiasFiltradas = Object.keys(this.historiasTiempoReal || {})
    }else if(this.filtro != ""){
      this.historiasFiltradas = this.keys(this.historiasTiempoReal).filter((historia) => (this.historiasTiempoReal[historia].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase()))

    }
  }

}
