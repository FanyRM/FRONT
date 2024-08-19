import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../interfaces/empleado';
import { EmpleadoService } from '../../../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styles: ``
})
export class ListaEmpleadoComponent implements OnInit{

  //Creamos un array para listar a los empleados
  listEmpleado: Empleado[] = []

  constructor(private _empleadoServices: EmpleadoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListEmpleado();
  }

  getListEmpleado () {
    this._empleadoServices.getListEmpleado().subscribe((data: Empleado[]) => {
      this.listEmpleado = data;
    })
  }

  deleteEmpleado (id: number) {
    this._empleadoServices.deleteEmpleado(id).subscribe(() => {
      this.toastr.warning('El empleado ha sido eliminado con exito','Advertencia')
      this.getListEmpleado();
    })
  }

}
