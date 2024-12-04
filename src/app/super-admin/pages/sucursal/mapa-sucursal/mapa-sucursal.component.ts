import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../../../../services/sucursal.service';
import { ToastrService } from 'ngx-toastr';
import * as L from 'leaflet';
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-mapa-sucursal',
  templateUrl: './mapa-sucursal.component.html',
  styleUrl: './mapa-sucursal.component.css'
})
export class MapaSucursalComponent implements OnInit {
  formUbicacion: FormGroup;
  id: number;
  mapa: any;
  marcador: any;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formUbicacion = this.fb.group({
      Loc_Suc: ['', [Validators.required, Validators.maxLength(60)]],
      Latitud: [null, Validators.required],
      Longitud: [null, Validators.required]
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id) {
      this.obtenerSucursal();
    }

    this.inicializarMapa();
  }

  inicializarMapa(): void {
    this.mapa = L.map('map').setView([21.1579931776308, -100.93429145210678], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.mapa.on('click', (e: any) => {
      const { lat, lng } = e.latlng;

      if (this.marcador) {
        this.mapa.removeLayer(this.marcador);
      }

      this.marcador = L.marker([lat, lng]).addTo(this.mapa);
      this.formUbicacion.patchValue({ Latitud: lat, Longitud: lng });
    });
  }

  obtenerSucursal(): void {
    this._sucursalService.getSucursal(this.id).subscribe((sucursal) => {
      this.formUbicacion.patchValue({
        Loc_Suc: sucursal.Loc_Suc,
        Latitud: sucursal.Latitud,
        Longitud: sucursal.Longitud
      });

      if (sucursal.Latitud && sucursal.Longitud) {
        this.marcador = L.marker([+sucursal.Latitud, +sucursal.Longitud]).addTo(this.mapa);
        this.mapa.setView([+sucursal.Latitud, +sucursal.Longitud], 13);
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
      this.toastr.error('No se pudo cargar la sucursal.', 'Error');
    });
  }

  guardarCambios(): void {
    if (this.formUbicacion.invalid) {
      return;
    }

    const { Loc_Suc, Latitud, Longitud } = this.formUbicacion.value;
    const datosActualizados = { Loc_Suc, Latitud, Longitud };

    this._sucursalService.updateSucursal(this.id, datosActualizados).subscribe(() => {
      this.toastr.success('Localización actualizada correctamente.', 'Éxito');
      this.router.navigate(['/super-admin/sucursales']);
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
      this.toastr.error('No se pudieron guardar los cambios.', 'Error');
    });
  }
}
