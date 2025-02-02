import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que esté disponible en toda la aplicación
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getSavedMode());
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {}

  private getSavedMode(): boolean {
    return localStorage.getItem('darkMode') === 'enabled';
  }

  toggleDarkMode(): void {
    const newMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newMode);
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');

    // Agrega o quita la clase de modo oscuro al <body>
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  applySavedMode(): void {
    if (this.getSavedMode()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
