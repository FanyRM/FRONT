import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../../interfaces/producto';
import { ProductoService } from '../../../../services/producto.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tip_prodsService } from '../../../../services/tip_prods.service';
import { tip_prods } from '../../../../interfaces/tip_prods';
import { SucursalService } from '../../../../services/sucursal.service';
import { Sucursal } from '../../../../interfaces/sucursal';
import { distribuidorsService } from '../../../../services/distribuidors.service';
import { distribuidors } from '../../../../interfaces/distribuidors';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl:'./nuevo-producto-component.html',
  styles: ``
})
export class NuevoProductoComponent implements OnInit {
  form:FormGroup;
  id:string;
  operation: string ='Agregar '
  tproductos: any[] = [];
  sucursales: any[] = [];
  distribuidores: any[]=[];
  isDarkMode: boolean = false;




  constructor(private fb: FormBuilder,
    private _productoService: ProductoService,
    private router:Router,
    private aRouter:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _serviceTipoProds: Tip_prodsService,
    private _sucursalService: SucursalService,
    private _distribuidorsService: distribuidorsService,
    private darkModeService: DarkModeService

  ) {
    this.form = this.fb.group({
      Nom_Prod:['',[Validators.required,Validators.maxLength(40)]],
      Tipo_Prod:['',[Validators.required]],
      Link_img:['',[Validators.required,Validators.maxLength(1000)]],
      Exist_Prod:['',Validators.required],
      Prec_Prod:['',Validators.required],
      Desc_Prod:['',Validators.required],
      IDSucursal:['',[Validators.required]],
      IDDistribuidor:['',[Validators.required]],
    })
    this.id=String(aRouter.snapshot.paramMap.get('id'))
   console.log(aRouter.snapshot.paramMap.get('id'))

  }
  ngOnInit(): void {
     if(this.id !="null"){
      //es editar
      this.operation ='Editar ';
      this.getProduct(this.id);
    }
    this.getTip_prodss();
    this.getListSucursal();
      this.getdistribuidors();
      this.darkModeService.darkMode$.subscribe((mode) => {
        this.isDarkMode = mode;
      });  
  }
  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}

  getdistribuidors(){
    this._distribuidorsService.getdistribuidors().subscribe((data: distribuidors[]) => {
      this.distribuidores = data;

    })
  }
  getTip_prodss(){
    this._serviceTipoProds.getTip_prodss().subscribe((data: tip_prods[]) => {
      this.tproductos = data;

    })
  }
  getListSucursal () {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.sucursales = data;
    })
  }
  getProduct(id: string){
this._productoService.getProduct(id).subscribe((data:Producto) => {
  console.log(data);
  this.form.setValue({
    Nom_Prod: data.Nom_Prod,
      Tipo_Prod: data.Tipo_Prod,
      Link_img:data.Link_img,
      Exist_Prod: data.Exist_Prod,
      Prec_Prod:data.Prec_Prod,
      Desc_Prod:data.Desc_Prod,
      IDSucursal:data.IDSucursal,
      IDDistribuidor:data.IDDistribuidor
  })
})
  }
  addProducto(){


    const producto :Producto = {
      Nom_Prod: this.form.value.Nom_Prod,
      Tipo_Prod: this.form.value.Tipo_Prod,
      Link_img: this.form.value.Link_img,
      Exist_Prod:this.form.value.Exist_Prod,
      Prec_Prod: this.form.value.Prec_Prod,
      Desc_Prod: this.form.value.Desc_Prod,
      IDSucursal: this.form.value.IDSucursal,
      IDDistribuidor: this.form.value.IDDistribuidor


    }
    if(this.id !="null"){
      this._productoService.updateProduct(this.id,producto).subscribe(() =>{
        producto.id = this.id;
        this._snackBar.open('Producto actualizado con exito', 'Cerrar',{
          duration:3000,
        });
        this.router.navigate(['/empleado/productos-e']);
      }
      )

    }else{
      //agregar
      this._productoService.saveProduct(producto).subscribe(()=>{

        this._snackBar.open('Producto agregado con exito','Cerrar',{
          duration:3000,
        });
        this.router.navigate(['/empleado/productos-e']);
      })
    }

  }

}

