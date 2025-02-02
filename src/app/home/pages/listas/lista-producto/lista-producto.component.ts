import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../interfaces/producto';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styles: ``
})
export class ListaProductoComponent implements OnInit{
  ListProducto: Producto[] = []
  isDarkMode: boolean = false;

  constructor(private _productService: ProductoService,
    private darkModeService: DarkModeService
  ) { }
  ngOnInit(): void{
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
