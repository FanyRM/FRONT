import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { LayoutSaComponent } from './pages/layout-sa/layout-sa.component';
import { PrincipalSaComponent } from './pages/principal-sa/principal-sa.component';
import { MaterialModule } from '../material/material.module';

import { ListaJuegoComponent } from './pages/juego/lista-juego/lista-juego.component';
import { NuevoJuegoComponent } from './pages/juego/nuevo-juego/nuevo-juego.component';

import { ListaEmpleadoComponent } from './pages/empleado/lista-empleado/lista-empleado.component';
import { NuevoEmpleadoComponent } from './pages/empleado/nuevo-empleado/nuevo-empleado.component';

import { ListaSucursalComponent } from './pages/sucursal/lista-sucursal/lista-sucursal.component';
import { NuevaSucursalComponent } from './pages/sucursal/nueva-sucursal/nueva-sucursal.component';

import { EditAcercaDeComponent } from './pages/edit-acerca-de/edit-acerca-de.component';
import { MapaSucursalComponent } from './pages/sucursal/mapa-sucursal/mapa-sucursal.component';


@NgModule({
  declarations: [
    LayoutSaComponent,
    PrincipalSaComponent,
    ListaJuegoComponent,
    NuevoJuegoComponent,
    ListaEmpleadoComponent,
    NuevoEmpleadoComponent,
    ListaSucursalComponent,
    NuevaSucursalComponent,
    EditAcercaDeComponent,
    MapaSucursalComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MaterialModule,
  ]
})
export class SuperAdminModule { }
