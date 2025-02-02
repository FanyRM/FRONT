import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { distribuidors } from '../../../../interfaces/distribuidors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distribuidorsService } from '../../../../services/distribuidors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../services/error.service';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-nuevo-distribuidor',
  templateUrl: './nuevo-distribuidor.component.html'
})
export class NuevoDistribuidorComponent {
  formAddDistribuidor: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  isDarkMode: boolean = false

  constructor( private fb: FormBuilder,
    private _distribuidorsService: distribuidorsService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private darkModeService: DarkModeService) {

    this.formAddDistribuidor= this.fb.group({
      id: [0],
      Nom_Distr: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
      Desc_Distr: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0) {
      //Es editar
      this.operacion = 'Editar ';
      this.getDistribuidor(this.id);
    }
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }

 toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getDistribuidor (id: number) {
    this._distribuidorsService.getDistribuidor(id).subscribe((data: distribuidors) => {
      this.formAddDistribuidor.setValue ({
        id: data.id,
        Nom_Distr: data.Nom_Distr,
        Desc_Distr: data.Desc_Distr,
      })
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    })
  }

  agregarDistribuidor () {
    const distribuidor: distribuidors = {
      Nom_Distr: this.formAddDistribuidor.value.Nom_Distr,
      Desc_Distr: this.formAddDistribuidor.value.Desc_Distr,
    }

    if(this.id !==0 ){
      //Es editar
      this._distribuidorsService.updateDistribuidor(this.id, distribuidor).subscribe(() => {
        this.toastr.success('Distribuidor actualizado correctamente', 'Actualizado')
        this.router.navigate(['/admin/distribuidores'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    } else {
      //Es agregar
      this._distribuidorsService.saveDistribuidor(distribuidor).subscribe(() => {
        this.toastr.success('Distribuidor agregado correctamente', 'Agregado')
        this.router.navigate(['/admin/distribuidores'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    }


  }
}
