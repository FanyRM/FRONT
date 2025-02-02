import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent implements OnInit {
  isDarkMode!: boolean;
  
    constructor(
      private darkModeService: DarkModeService
    ) {}
  ngOnInit(): void {
     // Escucha cambios en el modo oscuro
     this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });


    // Aplicar la clase al body si el modo oscuro está activado
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
