import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AccederService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint.endsWith('/') ? environment.endpoint : `${environment.endpoint}/`;
    this.myApiUrl = 'api/login/';
  }

  // Login con usuario y contraseña
  login(usuario: Usuario): Observable<{ id: number, IDRol: number, token: string }> {
    return this.http.post<{ id: number, IDRol: number, token: string }>(`${this.myAppUrl}${this.myApiUrl}`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error en login:', error);
          return throwError(() => new Error('Error en el login'));
        })
      );
  }

  // Login con Facebook
  loginWithFacebook(accessToken: string): Observable<{ id: number, IDRol: number, token: string }> {
    return this.http.post<{ id: number, IDRol: number, token: string }>(`${this.myAppUrl}api/facebook`, { accessToken })
      .pipe(
        catchError(error => {
          console.error('Error en login con Facebook:', error);
          return throwError(() => new Error('Error en el login con Facebook'));
        })
      );
  }
}
