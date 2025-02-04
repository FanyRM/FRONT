import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../interfaces/producto';
import { ProductoService } from '../../../../services/producto.service';
import { SucursalService } from '../../../../services/sucursal.service';

import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sucursal } from '../../../../interfaces/sucursal';
import { distribuidors } from '../../../../interfaces/distribuidors';
import { distribuidorsService } from '../../../../services/distribuidors.service';
import { DarkModeService } from '../../../../services/darMode.service';
import { PdfService } from '../../../../services/pdf.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styles: ``
})
export class ListaProductoComponent implements OnInit {
  ListProducto: Producto[] = [];
  sucursalesMap: { [key: string]: string } = {};
  distribuidoresMap: { [key: string]: string } = {};
  isDarkMode: boolean = false;
  productos: Producto[] = [];

  constructor(
    private _productService: ProductoService,
    private _sucursalService: SucursalService,
    private _distribuidorService: distribuidorsService,
    private _snackBar: MatSnackBar,
    private darkModeService: DarkModeService,
    private pdfService: PdfService

  ) {}

  ngOnInit(): void {
    this.getListProducts();
    this.getListSucursales();
    this.getListDistribuidores();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
    this.obtenerProductos();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }


  getListProducts() {
    this._productService.getListProducts().subscribe((data: Producto[]) => {
      this.ListProducto = data;
    });
  }

  getListSucursales() {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      data.forEach(sucursal => {
        this.sucursalesMap[sucursal.id!] = sucursal.Nom_Suc;
      });
    });
  }

  getListDistribuidores() {
    this._distribuidorService.getdistribuidors().subscribe((data: distribuidors[]) => {
      data.forEach(distribuidor => {
        this.distribuidoresMap[distribuidor.id!] = distribuidor.Nom_Distr;
      });
    });
  }

  deleteProduct(id: string) {
    this._productService.deletedProduct(id).subscribe(data => {
      console.log(data);
      this.getListProducts();

      this._snackBar.open('Venta Eliminada con exito', 'Cerrar', {
        duration: 3000,
      });
    });
  }
  obtenerProductos() {
    this._productService.getListProducts().subscribe(data => {
      this.productos = data;
    });
  }

  generarPDF() {
    this.pdfService.generateProductoPDF(this.productos);
  }
}
