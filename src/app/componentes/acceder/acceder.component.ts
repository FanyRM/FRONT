import { Component, OnInit } from '@angular/core';
import { AccederService } from '../../services/acceder.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-acceder',
  templateUrl: './acceder.component.html',
  styles: []
})

export class AccederComponent implements OnInit {

  formUsuario: FormGroup;
  user: SocialUser | null = null; // Datos del usuario de Facebook
  loggedIn: boolean = false;      // Estado de autenticación de Facebook

  constructor(
    private fb: FormBuilder,
    private _accederService: AccederService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private authService: SocialAuthService
  ) {
    this.formUsuario = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    // Escucha cambios en el estado de autenticación de Facebook
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if (this.loggedIn && user) {
        // Llamar a login con Facebook si se detecta inicio de sesión
        this.loginWithFacebook(user.authToken);  // Pasar el token de autenticación de Facebook
      }
    });
  }

  // Método para iniciar sesión con Facebook
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      this.toastr.info('Autenticado con Facebook', 'Éxito');
      this.loginWithFacebook(user.authToken);  // Iniciar sesión con el token de Facebook
    }).catch(error => {
      console.error('Error en autenticación con Facebook', error);
      this.toastr.error('Error al iniciar sesión con Facebook', 'Error');
    });
  }

  // Método para inicio de sesión con el formulario de usuario
  login() {
    if (this.formUsuario.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const usuario: Usuario = {
      Emp_Email: this.formUsuario.value.username,
      Contrasenia: this.formUsuario.value.password
    };

    this._accederService.login(usuario).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); // Verifica la respuesta
        this.handleLoginSuccess(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en el login:', error); // Para depuración
        this._errorService.msgError(error);
      }
    });
  }

  // Método para manejar el login con Facebook
  loginWithFacebook(accessToken: string) {
    this._accederService.loginWithFacebook(accessToken).subscribe({
      next: (response) => {
        console.log('Respuesta del login con Facebook:', response); // Verifica la respuesta
        this.handleLoginSuccess(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en el login con Facebook:', error); // Para depuración
        this._errorService.msgError(error);
      }
    });
  }

  // Método para manejar el éxito en la autenticación
  private handleLoginSuccess(response: any) {
    // Asegúrate de que la respuesta contenga la información esperada
    if (response && response.id && response.IDRol && response.token) {
      // Guarda la información en localStorage
      localStorage.setItem('id', response.id.toString());
      localStorage.setItem('IDRol', response.IDRol.toString());
      localStorage.setItem('token', response.token);

      const carga = Number(localStorage.getItem('IDRol'));
      console.log('Rol recibido:', carga); // Para verificar el rol

      // Verifica el rol y redirige
      if (![1, 2, 3].includes(carga)) {
        this.toastr.error('No es un usuario admitido por el sistema, comuníquese con el administrador', 'Error');
        this.router.navigate(['/acceder']); // Redirigir a la página de acceso
      } else {
        this.toastr.info('Bienvenido a la gestión de Sr. Macondo', 'Acceso aprobado');
        //Para empleados
        if (carga == 1) {
          this.toastr.info('Bienvenido querido empleado','Sr Macondo Web');
          this.router.navigate(['/empleado'])
        }

        //Para Administradores
        if (carga == 2) {
          this.toastr.info('Bienvenido querido empleado','Sr Macondo Web')
          this.router.navigate(['/admin'])
        }

        //Super administrador
        if (carga == 3) {
          this.toastr.info('Bienvenido querido empleado','Sr Macondo Web');
          this.router.navigate(['/super-admin'])
        }
      }
    } else {
      this.toastr.error('Respuesta inesperada del servidor', 'Error');
    }
  }
}
