import { Component, OnInit } from '@angular/core';
import mapboxgl,{ Marker } from 'mapbox-gl';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-api-mapa',
  templateUrl: './api-mapa.component.html',
  styles: ``
})
export class ApiMapaComponent implements OnInit {

  map!: mapboxgl.Map;

  constructor(){}

  ngOnInit(): void {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.93443315967465, 21.15722566623782],
      zoom: 13
    });

    // Agregar varios marcadores con nombres
    this.addMarker([-100.94429600712523, 21.157521863191832], 'Sucursal Pizzas');
    this.addMarker([-100.94145107078464, 21.160866469834914], 'Sucursal dos plazas');
    this.addMarker([-100.9264392476822, 21.160259675454313], 'Sucursal Satélite');
    this.addMarker([-100.92462667461444, 21.151330842008335], 'Sucursal Pincipal');

  }

  /* ngOnInit(): void {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.93, 21.15],
      zoom: 13
    });

    //this.map.addControl(new mapboxgl.NavigationControl());
    this.addMarker([-100.94, 21.15]);
  } */

    private addMarker(coordinates: [number, number], name: string): void {
      const marker = new mapboxgl.Marker({ draggable: false }) // Evita que el marcador sea arrastrable
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<p>${name}</p>`))
        .addTo(this.map);

      marker.getPopup()?.addTo(this.map);
      this.map.on('zoomend', () => {
        marker.setLngLat(coordinates);  // Fija las coordenadas del marcador
      });
    }

  /* private addMarker(coordinates: [number, number], name: string): void {
    const marker = new Marker()
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${name}</p>`)) // Popup con el nombre del punto
      .addTo(this.map);

    marker.getPopup()?.addTo(this.map); // Muestra el popup automáticamente si deseas
  } */

  /* private addMarker (coordinates: [number, number]): void {
    const marker = new Marker()
      .setLngLat(coordinates)
      .addTo(this.map)

    //marker.setPopup(new mapboxgl.Popup().setHTML('<p>HOLA</p>')).togglePopup();
    //marker.setPopup(new mapboxgl.Popup()).togglePopup();
  } */

}

