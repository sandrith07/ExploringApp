import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventos
  eventosTiempoReal


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

    firebase.database().ref('eventoanual').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.eventosTiempoReal = datos.val()
        this.eventosFiltrados = Object.keys(this.eventosTiempoReal)
        console.log('eventos tiempo real -', this.eventosTiempoReal);

      }else{
        this.eventosTiempoReal = {}
        this.eventosFiltrados = []
        console.log('eventos tiempo real vacios');
        
      }
    },(erro)=>{
      this.eventosTiempoReal = {}
      console.log('ocurrio el siguiente error al tratar de leer los datos de eventos ', erro);
      
    })
  }

  filtro
  eventosFiltrados
  filtrarEventos(){
    if(!this.filtro || this.filtro == ""){
      this.eventosFiltrados = Object.keys(this.eventosTiempoReal || {})
    }else if(this.filtro != ""){
      this.eventosFiltrados = this.keys(this.eventosTiempoReal).filter((evento) => (this.eventosTiempoReal[evento].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase()))

    }
  }

}
