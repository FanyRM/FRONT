import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-layout-sa',
  templateUrl: './layout-sa.component.html',
  styles: ``
})
export class LayoutSaComponent implements OnInit {
  isDarkMode: boolean = false;

  ngOnInit(): void {
    // Recuperar la configuración del modo oscuro desde localStorage
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

  constructor (private router: Router,private darkModeService: DarkModeService) {}
  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('IDRol');

    this.router.navigate(['/sr-macondo/tienda'])
  }
}
