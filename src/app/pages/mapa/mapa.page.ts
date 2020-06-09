import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';
import * as firebase from 'firebase';

const ALL_UBICATIONS: any[] = JSON.parse(`[
  {
    "id": 1,
    "idActivity": 9
  },
  {
    "id": 2,
    "idActivity": 6,
    "latitude": 10.437972,
    "longitude": -73.276145
  },
  {
    "id": 3,
    "idActivity": 20,
    "latitude": 10.441752,
    "longitude": -73.259246
  },
  {
    "id": 4,
    "idActivity": 24,
    "latitude": 10.477375,
    "longitude": -73.266961
  },
  {
    "id": 5,
    "idActivity": 8,
    "latitude": 10.454049,
    "longitude": -73.254385
  },
  {
    "id": 6,
    "idActivity": 1,
    "latitude": 10.445257,
    "longitude": -73.244731
  },
  {
    "id": 7,
    "idActivity": 14,
    "latitude": 10.504660,
    "longitude": -73.240601
  },
  {
    "id": 8,
    "idActivity": 4,
    "latitude": 10.473584,
    "longitude": -73.249042
  },
  {
    "id": 9,
    "idActivity": 12,
    "latitude": 10.478364,
    "longitude": -73.229131
  },
  {
    "id": 10,
    "idActivity": 2,
    "latitude": 10.464885,
    "longitude": -73.245902
  },
  {
    "id": 11,
    "idActivity": 22,
    "latitude": 10.477320,
    "longitude": -73.284135
  },
  {
    "id": 12,
    "idActivity": 8,
    "latitude": 10.494974,
    "longitude": -73.268163
  },
  {
    "id": 13,
    "idActivity": 22,
    "latitude": 10.487183,
    "longitude": -73.239629
  },
  {
    "id": 14,
    "idActivity": 3,
    "latitude": 10.501280,
    "longitude": -73.275431
  },
  {
    "id": 15,
    "idActivity": 27,
    "latitude": 10.490526,
    "longitude": -73.263253
  },
  {
    "id": 16,
    "idActivity": 1,
    "latitude": 10.451326,
    "longitude": -73.266295
  },
  {
    "id": 17,
    "idActivity": 20,
    "latitude": 10.450729,
    "longitude": -73.279489
  },
  {
    "id": 18,
    "idActivity": 24,
    "latitude": 10.491984,
    "longitude": -73.275380
  },
  {
    "id": 19,
    "idActivity": 11,
    "latitude": 10.482126,
    "longitude": -73.254364
  }
]`);


declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})



export class MapaPage implements OnInit {
  negocios
  negociosTiempoReal
  negociosFavoritos

  sitios 
  sitiosTiempoReal
  sitiopersonalCargo= null;


  mapa: Mapboxgl.Map;

  constructor(){
    this.consultarNegociosTiempoReal(),
    this.consultarSitiosTiempoReal()

  }

  ngOnInit() {
    Mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtYWNobzA3IiwiYSI6ImNrYTJtZzY2YTAwZWgzbnM1cG9iNGplbjUifQ.pb7EctMWJfeR9cqi6wlEyg';
    this.mapa = new Mapboxgl.Map({
    container: 'mapa', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.2591069, 10.4717611], // starting position
    zoom: 12 // starting zoom
    });
// Add zoom and rotation controls to the map.


   
  }

  
  keys(objeto: Object){
    return Object.keys((objeto || {})) 
  }



  consultarNegociosTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('negocios').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){

        this.negociosTiempoReal = datos.val()
        this.negociosFiltrados = Object.keys(this.negociosTiempoReal)
        console.log('sitios tiempo real -', this.negociosTiempoReal);
        this.mostrarUbicacionNegocios();

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

 
mostrarUbicacionNegocios(){

      for(let negocio of this.negociosFiltrados){
        let nombre=this.negociosTiempoReal[negocio].nombre;
        let tipo=this.negociosTiempoReal[negocio].tipo;
        let imagen=this.negociosTiempoReal[negocio]?.imagen;
        console.log("tipo", tipo)
        const latitud= this.negociosTiempoReal[negocio].latitud;
        const longitud=this.negociosTiempoReal[negocio].longitud;

        let sitio = new Mapboxgl.Popup({ offset: 25 }).setHTML('<div class="row margin-0 center-xs"><strong><ion-label class="ion-text-center">'+nombre+ '</ion-label></strong></div><ion-img src="'+ imagen+'" *ngIf="imagen"></ion-img>');
        var sitioe = document.createElement('div');

        sitioe.id = "marker"
        let sitiom = new Mapboxgl.Marker(sitioe,{
          draggable: false
          })
          .setLngLat([longitud, latitud]).setPopup(sitio)
          .addTo(this.mapa);
      }
  }



  
  consultarSitiosTiempoReal(){
    console.log('entre a consulta tiempo real');

    firebase.database().ref('sitiosturisticos').on('value', (datos)=>{
      console.log('entre a firebase consulta');
      
      if(datos.exists()){
        this.sitiosTiempoReal = datos.val()
        this.sitiosFiltrados = Object.keys(this.sitiosTiempoReal)
        console.log('sitios tiempo real -', this.sitiosTiempoReal);
        this.mostrarUbicacionSitios();

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

  filtros
  sitiosFiltrados
  filtrarSitios(){
    if(!this.filtros || this.filtros == ""){
      this.sitiosFiltrados = Object.keys(this.sitiosTiempoReal || {})
    }else if(this.filtros != ""){
      this.sitiosFiltrados = this.keys(this.sitiosTiempoReal).filter((sitio) => (this.sitiosTiempoReal[sitio].nombre).toString().toLowerCase().includes((this.filtros).toString().toLowerCase()))

    }
  }

  mostrarUbicacionSitios(){

    for(let sitiot of this.sitiosFiltrados){
      let nombre=this.sitiosTiempoReal[sitiot].nombre;
      let tipo=this.sitiosTiempoReal[sitiot].tipo;
      let imagen=this.sitiosTiempoReal[sitiot]?.imagen;
      console.log("tipo", tipo)
      const latitud= this.sitiosTiempoReal[sitiot].latitud;
      const longitud=this.sitiosTiempoReal[sitiot].longitud;

      let sitio = new Mapboxgl.Popup({ offset: 25 }).setHTML('<div class="row margin-0 center-xs"><strong><ion-label class="ion-text-center">'+nombre+ '</ion-label></strong></div><ion-img src="'+ imagen+'" *ngIf="imagen"></ion-img>');
      var sitioe = document.createElement('div');

      sitioe.id = "marker-sitios"
      let sitiom = new Mapboxgl.Marker(sitioe,{
        draggable: false
        })
        .setLngLat([longitud, latitud]).setPopup(sitio)
        .addTo(this.mapa);
    }
}



 /* mostrarUbicacion(){
    ALL_UBICATIONS.forEach(item=>{
      let sitio = new Mapboxgl.Popup({ offset: 25 }).setHTML("nombre");
        var sitioe = document.createElement('div');
        sitioe.id = "marker"
        let sitiom = new Mapboxgl.Marker(sitioe,{
          draggable: false
          })
          .setLngLat([item.longitude, item.latitude]).setPopup(sitio)
          .addTo(this.mapa);
          console.log("latitud", item.latitude);
          console.log("longitud", item.longitude);
    })
  }*/
  

 



}
