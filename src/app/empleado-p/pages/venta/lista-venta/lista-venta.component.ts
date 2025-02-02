import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../../interfaces/venta';
import { Producto } from '../../../../interfaces/producto'; // Asegúrate de importar Producto
import { VentaService } from '../../../../services/venta.service';
import { ProductoService } from '../../../../services/producto.service'; // Asegúrate de importar ProductoService
import { MatSnackBar } from '@angular/material/snack-bar';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html',
  styles: [``]
})
export class ListaVentaComponent implements OnInit {
  ListVenta: (Venta & { Nom_Prod?: string })[] = [];
  productosMap: Map<number, string> = new Map();
  isDarkMode: boolean = false;

  constructor(
    private _ventaService: VentaService,
    private _productoService: ProductoService,
    private _snackBar: MatSnackBar,
    private darkModeService: DarkModeService,
  ) {}

  ngOnInit(): void {
    this.getListVentas();
    this.darkModeService.applySavedMode();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getListVentas() {
    this._productoService.getListProducts().subscribe((productos: Producto[]) => {
      productos.forEach(producto => {
        this.productosMap.set(parseInt(producto.id!), producto.Nom_Prod);
      });

      this._ventaService.getListVentas().subscribe((ventas: Venta[]) => {
        this.ListVenta = ventas.map(venta => {
          return {
            ...venta,
            Nom_Prod: this.productosMap.get(venta.IDProducto) || 'Desconocido'
          };
        });
      });
    });
  }

  deleteVentas(id: number) {
    this._ventaService.deleteVenta(id).subscribe(() => {
      this.getListVentas();
      this._snackBar.open('Venta borrada con éxito', 'Cerrar', {
        duration: 2000,
      });
    });
  }
}
