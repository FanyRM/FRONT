import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Venta } from '../../../../interfaces/venta';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../../../services/venta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tip_prods } from '../../../../interfaces/tip_prods';
import { Tip_prodsService } from '../../../../services/tip_prods.service';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../interfaces/producto';
import { DarkModeService } from '../../../../services/darMode.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta-component.html',
  styles: ``
})
export class NuevaVentaComponent implements OnInit {
  formAddVenta: FormGroup;
  id: number;
  operation: string = 'Agregar ';
  productos: any[] = [];
  isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _ventaService: VentaService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _serviceTipoProds: Tip_prodsService,
    private _serviceProductos :ProductoService,
    private darkModeService: DarkModeService,
    
  ) {
    this.formAddVenta = this.fb.group({
      id: [0],
      Cant_vent: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      IDProducto: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Validación para enteros
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      // es editar
      this.operation = 'Editar ';
      this.getVenta(this.id);

    }
    this. getProductos();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  
 toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  
  getProductos(){
  this._serviceProductos.getProductos().subscribe((data: Producto[]) => {
    this.productos = data;

  })
}
  getVenta(id: number) {
    this._ventaService.getVenta(id).subscribe((data: Venta) => {
      console.log(data);
      this.formAddVenta.patchValue({
        id: data.id,
        Cant_vent: data.Cant_vent,
        IDProducto: data.IDProducto,
      });
    });
  }

  addVenta() {
    const venta: Venta = {
      Cant_vent: this.formAddVenta.value.Cant_vent,
      IDProducto: this.formAddVenta.value.IDProducto || 0 // Valor por defecto si está vacío
    };

    if (this.id != 0) {
      this._ventaService.updateVenta(this.id, venta).subscribe(() => {
        venta.id = this.id;
        this._snackBar.open('Venta actualizada con exito', 'Cerrar',{
          duration:3000,
        });
        this.router.navigate(['/empleado/ventas-e']);
      });
    } else {
      // agregar
      this._ventaService.saveVenta(venta).subscribe(() => {

        this._snackBar.open('Venta Agregada con exito','Cerrar',{
          duration:3000,
        });
        this.router.navigate(['/empleado/ventas-e']);
      });
    }
  }
}
