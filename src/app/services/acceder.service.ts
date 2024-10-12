import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class AccederService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/login/';
  }

  login(usuario: Usuario): Observable<{ id: number, IDRol: number ,token: string}> {
    return this.http.post<{ id: number, IDRol: number, token: string}>(`${this.myAppUrl}${this.myApiUrl}`, usuario);
}

// Servicio de Angular para manejar el login con Facebook
loginWithFacebook(accessToken: string) {
  return this.http.post('http://localhost:3000/api/auth/login/facebook', { accessToken });
}


}
