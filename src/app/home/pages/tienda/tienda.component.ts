import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importación necesaria para la navegación
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto.service';
import { Sucursal } from '../../../interfaces/sucursal';
import { SucursalService } from '../../../services/sucursal.service';
import { Juego } from '../../../interfaces/juego';
import { JuegoService } from '../../../services/juego.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styles: ``
})
export class TiendaComponent implements OnInit {
  ListProducto: Producto[] = [];
  ListSucursal: Sucursal[] = [];
  ListJuego: Juego[] = [];

  constructor(
    private _productService: ProductoService,
    private _sucursalService: SucursalService,
    private _juegoService: JuegoService,
    private router: Router // Inyectamos el servicio Router
  ) {}

  ngOnInit(): void {
    this.getListProducts();
    this.getListSucursal();
    this.getListJuego();
  }

  getListProducts() {
    this._productService.getListProducts().subscribe((data: Producto[]) => {
      this.ListProducto = data;
    });
  }

  getListSucursal() {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.ListSucursal = data;
    });
  }

  getListJuego() {
    this._juegoService.getListJuego().subscribe((data: Juego[]) => {
      this.ListJuego = data;
    });
  }

  irAPago(): void {
    this.router.navigate(['/pago']); // Navega a la ruta de pago
  }
}
