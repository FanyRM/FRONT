import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../interfaces/empleado';
import { RolService } from '../../../services/rol.service';
import { SucursalService } from '../../../services/sucursal.service';
import { Rol } from '../../../interfaces/rol';
import { Sucursal } from '../../../interfaces/sucursal';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-principal-sa',
  templateUrl: './principal-sa.component.html',
  styles: ``
})
export class PrincipalSaComponent implements OnInit{

  mostrarBotonRegresar: boolean = false;
  idRol: number;
  listEmpleado: Empleado[] = [];
  listRoles: Rol[] = [];
  listSucursales: Sucursal[] = [];
  isDarkMode: boolean = false;

  constructor(private router: Router,
    private _empleadoServices: EmpleadoService,
    private _rolService: RolService,
    private darkModeService: DarkModeService,
    private _sucursalService: SucursalService) {
    this.idRol = Number(localStorage.getItem('IDRol'));
  }


  ngOnInit(): void {
    // Mostrar el botón "Regresar" solo si el IDRol es 3 (super-admin)
    if (this.idRol === 3) {
      this.mostrarBotonRegresar = true;
    }
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
    this.getListEmpleado();
    this.getListRoles();
    this.getListSucursales();
  }
  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}


  regresar(): void {
    // Redirigir según el IDRol
    if (this.idRol === 3) {
      this.router.navigate(['/super-admin']);
    }
  }

  getListEmpleado () {
    this._empleadoServices.getListEmpleado().subscribe((data: Empleado[]) => {
      this.listEmpleado = data;
    })
  }

  getListRoles() {
    this._rolService.getListRol().subscribe((data: Rol[]) => {
      this.listRoles = data;
    });
  }

  getListSucursales() {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.listSucursales = data;
    });
  }

  getRolName(idRol: number | undefined): string {
    if (idRol === undefined) return 'Desconocido';
    const rol = this.listRoles.find(r => r.id === idRol);
    return rol ? rol.Nom_Rol : 'Desconocido';
  }

  getSucursalName(idSucursal: number | undefined): string {
    if (idSucursal === undefined) return 'Desconocido';
    const sucursal = this.listSucursales.find(s => s.id === idSucursal);
    return sucursal ? sucursal.Nom_Suc : 'Desconocido';
  }

}
