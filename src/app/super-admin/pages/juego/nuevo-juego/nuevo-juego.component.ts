import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoService } from '../../../../services/juego.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Juego } from '../../../../interfaces/juego';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-nuevo-juego',
  templateUrl: './nuevo-juego.component.html',
  styles: ``
})
export class NuevoJuegoComponent implements OnInit{
  formAddJuego: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  isDarkMode: boolean = false;

  constructor( private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _juegoService: JuegoService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private darkModeService: DarkModeService
    ) {
    this.formAddJuego = this.fb.group({
      id: [0],
      Nom_Jueg: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      Precio: [null, [Validators.required, Validators.min(1)]],
      Tiempo: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      Dispon_Jueg: ['', Validators.required],
      Img_Jueg: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
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
      this.getJuego(this.id);
    }
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }


  getJuego (id: number) {
    this._juegoService.getJuego(id).subscribe((data: Juego) => {
      this.formAddJuego.setValue ({
        id: data.id,
        Nom_Jueg: data.Nom_Jueg,
        Precio: data.Precio,
        Tiempo: data.Tiempo,
        Dispon_Jueg: data.Dispon_Jueg,
        Img_Jueg: data.Img_Jueg
      })
    }, (error: HttpErrorResponse) => {
      console.error('Error', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    })
  }

  agregarJuego () {
    const juego: Juego = {
      Nom_Jueg: this.formAddJuego.value.Nom_Jueg,
      Precio: this.formAddJuego.value.Precio,
      Tiempo: this.formAddJuego.value.Tiempo,
      Dispon_Jueg: this.formAddJuego.value.Dispon_Jueg,
      Img_Jueg: this.formAddJuego.value.Img_Jueg
    }

    if(this.id !==0 ){
      //Es editar
      this._juegoService.updateJuego(this.id, juego).subscribe(() => {
        this.toastr.success('Juego actualizado correctamente', 'Actualizado')
        this.router.navigate(['/super-admin/juegos'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    } else {
      //Es agregar
      this._juegoService.saveJuego(juego).subscribe(() => {
        this.toastr.success('Juego agregado correctamente', 'Agregado')
        this.router.navigate(['/super-admin/juegos'])
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    }
  }

}
