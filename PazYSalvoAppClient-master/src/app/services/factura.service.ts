import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl = 'https://localhost:4000/api/factura'; // OJO - Debe ser de acuerdo al puerto que estén utilizando en sus máquinas

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) { }

  // LEER LOS ELEMENTOS DESDE BD
  cargarFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.baseUrl);
  }

  // NUEVO
  // Implementación de métodos adicionales para crear, editar, eliminar facturas si es necesario
}
