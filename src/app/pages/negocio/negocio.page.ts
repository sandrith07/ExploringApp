import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.page.html',
  styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {

  negocios
  negociosTiempoReal


  constructor(){
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

  filtro
  negociosFiltrados
  filtrarNegocios(){
    if(!this.filtro || this.filtro == ""){
      this.negociosFiltrados = Object.keys(this.negociosTiempoReal || {})
    }else if(this.filtro != ""){
      this.negociosFiltrados = this.keys(this.negociosTiempoReal).filter((negocio) => (this.negociosTiempoReal[negocio].nombre).toString().toLowerCase().includes((this.filtro).toString().toLowerCase()))

    }
  }

}
