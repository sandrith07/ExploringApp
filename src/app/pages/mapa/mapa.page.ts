import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';

declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  mapa: Mapboxgl.Map;

  ngOnInit() {
    Mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtYWNobzA3IiwiYSI6ImNrYTJtZzY2YTAwZWgzbnM1cG9iNGplbjUifQ.pb7EctMWJfeR9cqi6wlEyg';
    this.mapa = new Mapboxgl.Map({
    container: 'mapa', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.2591069, 10.4717611], // starting position
    zoom: 12 // starting zoom
    });
// Add zoom and rotation controls to the map.

let valledupar = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>Valledupar, Cesar (Municipio) </p>');
    var valledupare = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    valledupare.id = "marker-municipio"
    let valleduparm = new Mapboxgl.Marker(valledupare,{
      draggable: false
      })
      .setLngLat([-73.2932692, 10.4645885]).setPopup(valledupar)
      .addTo(this.mapa);

      let lapaz = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>La paz, Cesar (Municipio) </p>');
      var lapaze = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      lapaze.id = "marker-municipio"
      let lapazm = new Mapboxgl.Marker(lapaze,{
        draggable: false
        })
        .setLngLat([-73.1804268, 10.3878401]).setPopup(lapaz)
        .addTo(this.mapa);

        let sandiego = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>Sandiego, Cesar (Municipio) </p>');
      var sandiegoe = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      sandiegoe.id = "marker-municipio"
      let sandiegom = new Mapboxgl.Marker(sandiegoe,{
        draggable: false
        })
        .setLngLat([-73.1894728, 10.333995]).setPopup(sandiego)
        .addTo(this.mapa);

        let aguablanca = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>Aguas Blancas, Cesar (Municipio) </p>');
      var aguablancae = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      sandiegoe.id = "marker-municipio"
      let aguablancam = new Mapboxgl.Marker(aguablancae,{
        draggable: false
        })
        .setLngLat([-73.1894728, 10.333995]).setPopup(aguablanca)
        .addTo(this.mapa);


let exito = new Mapboxgl.Popup({ offset: 25 })
.setHTML('<ion-subtitle>Super mercado</ion-subtitle><ion-title>Éxito las Flores</ion-title>');
    var exitoe = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    exitoe.id = "marker"
    let exitom = new Mapboxgl.Marker(exitoe,{
      draggable: false
      })
      .setLngLat([-73.2591069, 10.4717611]).setPopup(exito)
      .addTo(this.mapa);

      let plaza = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>Plaza Alfonso Lopéz</p>');
    var plazae = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    plazae.id = "marker"
    let plazam = new Mapboxgl.Marker(plazae,{
      draggable: false
      })
      .setLngLat([73.2607822, 10.4728202]).setPopup(plaza)
      .addTo(this.mapa);

      let mayalesplaza = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>SAO la Ceiba</p>');
      var mayalesplazae = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      mayalesplazae.id = "marker"
      let mayalesplazam = new Mapboxgl.Marker(mayalesplazae,{
        draggable: false
        })
        .setLngLat([-73.2591069, 10.4717611]).setPopup(mayalesplaza)
        .addTo(this.mapa);

        let parqueviajero = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>Parque el viajero</p>');
      var parqueviajeroe = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      parqueviajeroe.id = "marker"
      let parqueviajerom = new Mapboxgl.Marker(parqueviajeroe,{
        draggable: false
        })
        .setLngLat([-73.2441445, 10.4558507]).setPopup(parqueviajero)
        .addTo(this.mapa);

        let plospoporos = new Mapboxgl.Popup({ offset: 25 }).setHTML('<p>Los poporos</p>');
      var  lospoporose = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      lospoporose.id = "marker"
      let lospoporosm = new Mapboxgl.Marker(lospoporose,{
        draggable: false
        })
        .setLngLat([-73.2607822, 10.4728202]).setPopup( plospoporos)
        .addTo(this.mapa);
  


     // this.mapa.flyTo({center: [-73.2601624, 10.469671]})

/*const element = document.createElement('div');
element.className = 'marker'
const marker = new Mapboxgl.Marker(element)
.setLngLat({
  lng:-73.2601624,
  lat:10.469671
})
.addTo(this.mapa)*/
  }
}
