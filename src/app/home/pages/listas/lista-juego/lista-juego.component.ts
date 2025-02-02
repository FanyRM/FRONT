import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../../interfaces/juego';
import { JuegoService } from '../../../../services/juego.service';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-juego',
  templateUrl: './lista-juego.component.html',
})
export class ListaJuegoComponent implements OnInit {

  ListJuego: Juego[] = []
  isDarkMode: boolean = false;
  constructor(
    private _juegoService: JuegoService,
    private darkModeService: DarkModeService
  ) { }
  ngOnInit(): void{
    this.getListJuego();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getListJuego(){
    this._juegoService.getListJuego().subscribe((data:Juego[])=> {
      this.ListJuego = data;
  })
 
  
}
}
