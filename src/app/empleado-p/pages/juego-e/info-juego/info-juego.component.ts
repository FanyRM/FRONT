import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoService } from '../../../../services/juego.service';
import { Juego } from '../../../../interfaces/juego';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-info-juego',
  templateUrl: './info-juego.component.html',
  styles: ``
})
export class InfoJuegoComponent implements OnInit{
  isDarkMode: boolean = false;
  formAddJuego: FormGroup;
  id: number;
  operacion: string = 'Agregar ';


  constructor( private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _juegoService: JuegoService,
    private darkModeService: DarkModeService
    ) {
    this.formAddJuego = this.fb.group({
      id: [0],
      Nom_Jueg: ['', [Validators.required, Validators.maxLength(30)]],
      Precio: [null, [Validators.required, Validators.maxLength(60)]],
      Tiempo: ['', [Validators.required, Validators.maxLength(300)]],
      Dispon_Jueg: ['', Validators.required],
      Img_Jueg: ['', [Validators.required, Validators.maxLength(300)]],
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0) {
      this.darkModeService.darkMode$.subscribe((mode) => {
        this.isDarkMode = mode;
      });  
      //Es editar
      this.operacion = 'Editar ';
      this.getJuego(this.id);
    }
    


    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  


  
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
        this.router.navigate(['/empleado/juegos-e'])
      })
    } else {
      //Es agregar
      this._juegoService.saveJuego(juego).subscribe(() => {
        this.router.navigate(['/super-admin/juegos'])
      }, (error: any) => {
        console.log('Error'),
        console.log(error)
      })
    }
  }


}
