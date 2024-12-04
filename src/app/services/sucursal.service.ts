import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sucursal } from '../interfaces/sucursal';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sucursales/';
  }

  getListSucursal (): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteSucursal (id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveSucursal (sucursal: Sucursal): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,sucursal);
  }

  getSucursal (id: number): Observable<Sucursal>{
    return this.http.get<Sucursal>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateSucursal(id: number, sucursal: Partial<Sucursal>): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, sucursal);
  }

}
