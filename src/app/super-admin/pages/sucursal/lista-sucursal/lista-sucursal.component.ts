import { Sucursal } from './../../../../interfaces/sucursal';
import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../../../services/sucursal.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../../../services/darMode.service';
import { PdfService } from '../../../../services/pdf.service';

@Component({
  selector: 'app-lista-sucursal',
  templateUrl: './lista-sucursal.component.html',
  styles: ``
})
export class ListaSucursalComponent implements OnInit{

  listSucursal: Sucursal[] = []
  isDarkMode: boolean = false;
  sucursales: Sucursal[]=[]

  constructor(private _sucursalService: SucursalService, private toastr: ToastrService,private darkModeService: DarkModeService,
      private pdfService: PdfService) {}

  ngOnInit(): void {
    this.getListSucursal();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}


  getListSucursal () {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.listSucursal = data;
    })
  }

  deleteSucursal (id: number) {
    this._sucursalService.deleteSucursal(id).subscribe(() => {
      this.toastr.warning('La sucursal ha sido eliminada con exito','Advertencia')
      this.getListSucursal();
    })
  }

  obtenerSucursales() {
    this._sucursalService.getListSucursal().subscribe(data => {
      this.sucursales = data;
    });
  }

  generarPDF() {
    this.pdfService.generateSucursalPDF(this.sucursales);
  }

}
