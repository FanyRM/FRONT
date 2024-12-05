import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html'
})
export class HomeUsersComponent implements OnInit {
  admin: boolean = false;
  superAdmin: boolean = false;
  empleado: boolean = false;
  idRol: number;

  constructor(private router: Router, private authService: SocialAuthService) {
    this.idRol = Number(localStorage.getItem('IDRol'));
  }

  ngOnInit(): void {
    if (this.idRol === 3) {
      this.superAdmin = true;
    }

    if (this.idRol === 2) {
      this.admin = true;
    }

    if (this.idRol === 1) {
      this.empleado = true;
    }
  }

  LogOut() {
    // Cerrar sesión en Facebook
    this.authService.signOut().then(() => {
      console.log('Sesión cerrada en Facebook');
      // Eliminar los datos de sesión del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('IDRol');
      localStorage.removeItem('accessToken');
      
      // Redirigir al usuario a la página de inicio
      this.router.navigate(['/sr-macondo/tienda']);
    }).catch(error => {
      console.error('Error al cerrar sesión en Facebook:', error);
      // Eliminar datos de sesión del localStorage incluso si falla el cierre de sesión en Facebook
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('IDRol');
      localStorage.removeItem('accessToken');
      this.router.navigate(['/sr-macondo/tienda']);
    });
  }
}
