import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalSaComponent } from './pages/principal-sa/principal-sa.component';
import { LayoutSaComponent } from './pages/layout-sa/layout-sa.component';

import { ListaJuegoComponent } from './pages/juego/lista-juego/lista-juego.component';
import { NuevoJuegoComponent } from './pages/juego/nuevo-juego/nuevo-juego.component';

import { ListaSucursalComponent } from './pages/sucursal/lista-sucursal/lista-sucursal.component';
import { NuevaSucursalComponent } from './pages/sucursal/nueva-sucursal/nueva-sucursal.component';

import { ListaEmpleadoComponent } from './pages/empleado/lista-empleado/lista-empleado.component';
import { NuevoEmpleadoComponent } from './pages/empleado/nuevo-empleado/nuevo-empleado.component';

import { EditAcercaDeComponent } from './pages/edit-acerca-de/edit-acerca-de.component';
import { MapaSucursalComponent } from './pages/sucursal/mapa-sucursal/mapa-sucursal.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSaComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalSaComponent
      },


      //Craga a los componentes de juegos
      {
        path: 'juegos' ,
        component: ListaJuegoComponent
      },
      {
        path: 'juego/:id' ,
        component: NuevoJuegoComponent
      },
      {
        path: 'nuevo-juego' ,
        component: NuevoJuegoComponent
      },


      //Carga a los componentes de sucursal
      {
        path: 'sucursales' ,
        component: ListaSucursalComponent
      },
      {
        path: 'sucursal/:id' ,
        component: NuevaSucursalComponent
      },
      {
        path: 'nueva-sucursal' ,
        component: NuevaSucursalComponent
      },
      { path: 'mapa/:id',
        component: MapaSucursalComponent },


      //Carga los componentes de empleado
      {
        path: 'empleados' ,
        component: ListaEmpleadoComponent
      },
      {
        path: 'empleado/:id' ,
        component: NuevoEmpleadoComponent
      },
      {
        path: 'nuevo-empleado' ,
        component: NuevoEmpleadoComponent
      },


      //Va a un componente que edita la informacion del componente acerca-de en home
      {
        path: 'editar-info' ,
        component: EditAcercaDeComponent
      },

      //Lo que siempre carga aunque no se escriba nada
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
