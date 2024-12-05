import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccederComponent } from './componentes/acceder/acceder.component';
import { Error404Component } from './componentes/error404/error404.component';
import { Error401Component } from './componentes/error401/error401.component';
import { AccederGuard } from './utils/acceder.guard';
import { HomeUsersComponent } from './componentes/home-users/home-users.component';
import { ApiMapaComponent } from './componentes/api-mapa/api-mapa.component';
import { PagoComponent } from '../pago/pago.component'; // Importa el componente de pago

const routes: Routes = [
  {
    path: 'super-admin',
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [AccederGuard],
    data: { allowedRoles: [3] },
  },
  {
    path: 'sr-macondo',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado-p/empleado-p.module').then(m => m.EmpleadoPModule),
    canActivate: [AccederGuard],
    data: { allowedRoles: [1, 2, 3] },
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AccederGuard],
    data: { allowedRoles: [2, 3] }
  },
  {
    path: 'acceder',
    component: AccederComponent
  },
  {
    path: 'principal',
    component: HomeUsersComponent
  },
  {
    path: 'mapa',
    component: ApiMapaComponent
  },
  {
    path: 'acceso-denegado',
    component: Error401Component
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: 'pago', // Nueva ruta para la página de pago
    component: PagoComponent
  },
  {
    path: '',
    redirectTo: 'sr-macondo',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
