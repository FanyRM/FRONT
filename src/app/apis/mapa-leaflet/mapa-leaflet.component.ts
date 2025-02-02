import * as leaflet from "leaflet";
import { Component, OnInit } from '@angular/core';
import { SucursalService } from "../../services/sucursal.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Sucursal } from "../../interfaces/sucursal";
import { DarkModeService } from "../../services/darMode.service";

@Component({
  selector: 'app-mapa-leaflet',
  templateUrl: './mapa-leaflet.component.html',
  styleUrl: './mapa-leaflet.component.css'
})
export class MapaLeafletComponent implements OnInit{

  private map: any;
  private userMarker: leaflet.Marker<any> | undefined;
  sucursales: any[] = [];
  isDarkMode: boolean = false;

  constructor(private _sucursalService: SucursalService,private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.initMap();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}


  private initMap(){
    this.map = leaflet.map('map').setView([21.1579931776308,-100.93429145210678],15);
    leaflet.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png').addTo(this.map);
    this.loadSucursales();
  }

  getLocation() {
    if (navigator.geolocation) {
      //Cambiar icono de la marca
      const myIcon = leaflet.icon({
        iconUrl: 'https://i.postimg.cc/KR8bJX7X/myUbi.png',
        iconSize:[25,41]
      })

      //Obtener mi poscisión
      navigator.geolocation.getCurrentPosition((position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        if(this.userMarker){
          this.userMarker = leaflet.marker(coords);
        }else {
          this.userMarker = leaflet.marker(coords, {icon:myIcon}).addTo(this.map).bindPopup('Estas aquí').openPopup();
        }

        this.map.setView(coords,15);
      }, ()=>{
        alert('No se puede obtener la geolocalización');
      })
    } else {
      alert('Geolocalización no soportada por el navegador');
    }
  }

   private loadSucursales() {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.sucursales = data;
      this.addMarkers();
    });
  }

  private addMarkers() {
    const myIcon = leaflet.icon({
      iconUrl: 'https://i.postimg.cc/dhz9tyJq/PIN-STORE.png',
      iconSize: [30,50]
    });

    // Itera sobre las sucursales y añade cada marcador
    this.sucursales.forEach(sucursal => {
      const lat = parseFloat(sucursal.Latitud);
      const lng = parseFloat(sucursal.Longitud);

      // Verificar que las coordenadas son válidas
      if (!isNaN(lat) && !isNaN(lng)) {
        leaflet.marker([lat, lng], { icon: myIcon })
          .addTo(this.map)
          .bindPopup(`<b>${sucursal.Nom_Suc}</b><br>${sucursal.Loc_Suc}<br>${sucursal.Des_Suc}`);
      } else {
        console.warn(`Coordenadas inválidas para la sucursal: ${sucursal.Nom_Suc}`);
      }
    });
  }

}

