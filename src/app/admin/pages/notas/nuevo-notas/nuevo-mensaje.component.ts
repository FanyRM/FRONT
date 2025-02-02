import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { NotasService } from '../../../../services/nota.service';
import { Notas } from '../../../../interfaces/notas';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-nuevo-mensaje',
  templateUrl: './nuevo-mensaje.component.html',
  styles: ``
})
export class NuevoNotasComponent implements OnInit{
  formAddNotas: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  
  isDarkMode: boolean = false;


  constructor( private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _NotasService: NotasService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private darkModeService: DarkModeService

    ) {
    this.formAddNotas = this.fb.group({
      id: [0],
      Remi_Nota: ['', [Validators.required, Validators.maxLength(30)]],
      Nota_Glob: [null, [Validators.required, Validators.maxLength(500)]],

    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0) {
      //Es editar
      this.operacion = 'Editar ';
      this.getNota(this.id);
    }
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }

  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}

  getNota (id: number) {
    this._NotasService.getNota(id).subscribe((data: Notas) => {
      this.formAddNotas.setValue ({
        id: data.id,
        Remi_Nota: data.Remi_Nota,
        Nota_Glob: data.Nota_Glob,
      })
    })
  }

  agregarNota () {
    const nota: Notas = {
      Remi_Nota: this.formAddNotas.value.Remi_Nota,
      Nota_Glob: this.formAddNotas.value.Nota_Glob,

    }

    if(this.id !==0 ){
      //Es editar
      this._NotasService.updateNota(this.id, nota).subscribe(() => {
        this.toastr.success('Nota actualizada correctamente', 'Actualizado');
        this.router.navigate(['/admin/mensajes'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    } else {
      //Es agregar
      this._NotasService.saveNota(nota).subscribe(() => {
        this.toastr.success('Nota agregada correctamente', 'Agregado')
        this.router.navigate(['/admin/mensajes'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    }
  }

}
