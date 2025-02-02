import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../interfaces/producto';
import { ProductoService } from '../../../../services/producto.service';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-menu',
  templateUrl: './lista-menu.component.html',
  styles: ``
})
export class ListaMenuComponent implements OnInit {
  ListProducto: Producto[] = []
  isDarkMode: boolean = false;

  constructor(private _productService: ProductoService,
  private darkModeService: DarkModeService,

  ) { }
  ngOnInit(): void {
    this.getListProducts();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getListProducts(){
    this._productService.getListProducts().subscribe((data:Producto[])=> {
      this.ListProducto = data;
    })
  }

}
