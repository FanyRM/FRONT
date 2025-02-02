import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../../interfaces/juego';
import { JuegoService } from '../../../../services/juego.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-juego',
  templateUrl: './lista-juego.component.html',
  styles: ``
})
export class ListaJuegoComponent implements OnInit{

  listJuego: Juego[] = []
  isDarkMode: boolean = false;

  constructor(private _juegoServices: JuegoService, private toastr: ToastrService,private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.getListJuego();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}



  getListJuego () {
    this._juegoServices.getListJuego().subscribe((data: Juego[]) => {
      this.listJuego = data;
    })
  }

  deleteJuego (id: number) {
    this._juegoServices.deleteJuego(id).subscribe(() => {
      this.toastr.warning('El juego ha sido eliminado con exito','Advertencia')
      this.getListJuego();
    })
  }
}
