import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SucursalService } from '../../../../services/sucursal.service';
import { Sucursal } from '../../../../interfaces/sucursal';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../services/error.service';
import { DarkModeService } from '../../../../services/darMode.service';


@Component({
  selector: 'app-nueva-sucursal',
  templateUrl: './nueva-sucursal.component.html',
  styles: ``
})
export class NuevaSucursalComponent implements OnInit {
  formAddSucursal: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  isDarkMode: boolean = false;

  constructor( private fb: FormBuilder,
    private _sucursalService: SucursalService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private darkModeService: DarkModeService) {

    this.formAddSucursal = this.fb.group({
      id: [0],
      Nom_Suc: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      Loc_Suc: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1)]],
      Des_Suc: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
      Img_Suc: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  

    if(this.id != 0) {
      //Es editar
      this.operacion = 'Editar ';
      this.getSucursal(this.id);
    }
  }
  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}


  getSucursal (id: number) {
    this._sucursalService.getSucursal(id).subscribe((data: Sucursal) => {
      this.formAddSucursal.setValue ({
        id: data.id,
        Nom_Suc: data.Nom_Suc,
        Loc_Suc: data.Loc_Suc,
        Des_Suc: data.Des_Suc,
        Img_Suc: data.Img_Suc
      })
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    })
  }

  agregarSucursal () {
    const sucursal: Sucursal = {
      Nom_Suc: this.formAddSucursal.value.Nom_Suc,
      Loc_Suc: this.formAddSucursal.value.Loc_Suc,
      Des_Suc: this.formAddSucursal.value.Des_Suc,
      Img_Suc: this.formAddSucursal.value.Img_Suc
    }

    if(this.id !==0 ){
      //Es editar
      this._sucursalService.updateSucursal(this.id, sucursal).subscribe(() => {
        this.toastr.success('Sucursal actualizada correctamente', 'Actualizado')
        this.router.navigate(['/super-admin/sucursales'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    } else {
      //Es agregar
      this._sucursalService.saveSucursal(sucursal).subscribe(() => {
        this.toastr.success('Sucursal agregada correctamente', 'Agregado')
        this.router.navigate(['/super-admin/sucursales'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    }
  }

}
