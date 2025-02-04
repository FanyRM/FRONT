import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../interfaces/empleado';
import { EmpleadoService } from '../../../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../../../services/darMode.service';
import { PdfService } from '../../../../services/pdf.service';


@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styles: ``
})
export class ListaEmpleadoComponent implements OnInit{

  //Creamos un array para listar a los empleados
  listEmpleado: Empleado[] = []
  isDarkMode: boolean = false;
  empleados: Empleado[] = [];

  constructor(private _empleadoServices: EmpleadoService, private toastr: ToastrService,private darkModeService: DarkModeService,private pdfService: PdfService) {}

  ngOnInit(): void {
    this.getListEmpleado();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
    this.obtenerEmpleados();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
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

  obtenerEmpleados() {
    this._empleadoServices.getListEmpleado().subscribe(data => {
      this.empleados = data;
    });
  }

  generarPDF() {
    this.pdfService.generateEmpleadoPDF(this.empleados);
  }

}
