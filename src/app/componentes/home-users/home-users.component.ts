import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html'
})
export class HomeUsersComponent implements OnInit {
  admin: boolean = false;
  superAdmin: boolean = false;
  empleado: boolean = false;
  idRol: number;

  constructor (private router: Router) {
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
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('IDRol');

    this.router.navigate(['/sr-macondo/tienda'])
  }
}
