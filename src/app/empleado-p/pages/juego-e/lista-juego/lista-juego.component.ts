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

  listJuego: Juego[] = [];
  id: number;
  isDarkMode: boolean = false;

  constructor(private _juegoServices: JuegoService,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
  ) {
    this.id = Number(localStorage.getItem('id'));
  }

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
      this.getListJuego();
    })
  }
  marcarOcupado(id: number) {
    this._juegoServices.updateDisponibiladJuego(id, true).subscribe({
      next: () => {
        this.toastr.info('El juego se ha marcado como Ocupado', 'Cambio de estado');
        this.getListJuego(); // Para refrescar la lista con los cambios
      },
      error: (error) => {
        console.error('Error al marcar como Ocupado:', error);
      }
    });
  }
  
  marcarDesocupado(id: number) {
    this._juegoServices.updateDisponibiladJuego(id, false).subscribe({
      next: () => {
        this.toastr.warning('El juego se ha marcado como Desocupado', 'Cambio de estado');
        this.getListJuego(); // Para refrescar la lista con los cambios
      },
      error: (error) => {
        console.error('Error al marcar como Desocupado:', error);
      }
    });
  }
}
