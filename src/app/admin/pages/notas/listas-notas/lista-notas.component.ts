import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoService } from '../../../../services/juego.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Juego } from '../../../../interfaces/juego';
import { Notas } from '../../../../interfaces/notas';
import { NotasService } from '../../../../services/nota.service';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './lista-notas.component.html',
  styles: ``
})
export class ListaNotaComponent implements OnInit{
    ListNotas: Notas[] = []
    
    isDarkMode: boolean = false;
    constructor(private _notasService: NotasService, private darkModeService: DarkModeService
    ) {}

    ngOnInit(): void {
      this.getListNota();
      this.darkModeService.darkMode$.subscribe((mode) => {
        this.isDarkMode = mode;
      });  
    }

 toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  
    getListNota() {
      this._notasService.getListNotas().subscribe((data: Notas[]) => {
        this.ListNotas = data;
      });
    }
  
    deleteNota(id: number) {
      this._notasService.deleteNota(id).subscribe(() => {
        this.getListNota();
      });
    }
  }


