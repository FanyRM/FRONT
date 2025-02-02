import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../../interfaces/sucursal';
import { SucursalService } from '../../../services/sucursal.service';
import { NotasService } from '../../../services/nota.service';
import { Notas } from '../../../interfaces/notas';
import { EmpleadoService } from '../../../services/empleado.service';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-home-e',
  templateUrl: './home-e.component.html',
  styles: ``
})
export class HomeEComponent implements OnInit {
  ListNotas: Notas[] = []
  ListSucursal: Sucursal[] = []
  id: number;
  mostrarBotonRegresar: boolean = false;
  idRol: number;
  isDarkMode: boolean = false;
  
  
  

  constructor(
    private _sucursalService: SucursalService,
    private _notasService: NotasService,
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router,
    private darkModeService: DarkModeService

  ) {
    this.id = Number(localStorage.getItem('id'));
    this.idRol = Number(localStorage.getItem('IDRol'));
  }

  ngOnInit(): void{
    

    this.getListNota();
    this.getListSucursal();
      }
      getListSucursal(){
        this._sucursalService.getListSucursal().subscribe((data:Sucursal[])=> {
          this.ListSucursal = data;
      })

      if (this.idRol === 2 || this.idRol === 3) {
        this.mostrarBotonRegresar = true;
      }
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  


  getListNota() {
    this._notasService.getListNotas().subscribe((data: Notas[]) => {
      this.ListNotas = data;
    });
  }

  deleteNota(id: number) {
    this._notasService.deleteNota(id).subscribe(() => {
      this.getListNota();
    });
  }

  // Método para actualizar el estado a "presente"
  marcarPresente() {
    this._empleadoService.updateEstadoEmpleado(this.id, true).subscribe({
      next: () => {
        this.toastr.info('Se a marcado tu estado como PRESENTE','Cambio de estado');
        console.log('Empleado marcado como presente');

      },
      error: (error) => {
        console.error('Error al marcar como presente:', error);
      }
    });
  }

  // Método para actualizar el estado a "ausente"
  marcarAusente() {
    this._empleadoService.updateEstadoEmpleado(this.id, false).subscribe({
      next: () => {
        this.toastr.warning('Se a marcado tu estado como AUSENTE','Cambio de estado');
        console.log('Empleado marcado como ausente');
      },
      error: (error) => {
        console.error('Error al marcar como ausente:', error);
      }
    });
  }

  regresar(): void {
    // Redirigir según el IDRol
    if (this.idRol === 2) {
      this.router.navigate(['/admin']);
    } else if (this.idRol === 3) {
      this.router.navigate(['/super-admin']);
    }
  }
  

}

