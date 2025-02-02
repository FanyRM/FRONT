import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InactivityService } from '../../../services/inactivity.service';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-layout-pages',
  templateUrl: './layout-pages.component.html',
  styles: ``
})
export class LayoutPagesComponent implements OnInit {
  isDarkMode!: boolean;

  constructor(
    private router: Router, 
    private inactivityService: InactivityService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    // Escucha cambios en el modo oscuro
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });

    this.inactivityService.inactivityTimeout$.subscribe(() => {
      this.LogOut();
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('IDRol');
    
    this.router.navigate(['/sr-macondo/tienda']);
  }
}
