# PazYSalvoAppClient

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.1.0.

## Índice

- [Desarrollo del Servidor](#desarrollo-del-servidor)
- [Implementación del Servicio para Cargar Facturas](#implementación-del-servicio-para-cargar-facturas)
- [Servidor de Desarrollo](#servidor-de-desarrollo)
- [Creación de Componentes](#creación-de-componentes)
- [Construcción del Proyecto](#construcción-del-proyecto)
- [Ejecutar Pruebas Unitarias](#ejecutar-pruebas-unitarias)
- [Ejecutar Pruebas End-to-End](#ejecutar-pruebas-end-to-end)
- [Ayuda Adicional](#ayuda-adicional)

## Desarrollo del Servidor

El backend de esta aplicación se encuentra en el siguiente repositorio:

[Link del backend](https://github.com/yBetancurr4002/PazzYSalvoApp.git)

## Implementación del Servicio para Cargar Facturas

### 1. Implementar el método `cargarFacturas` en `factura.service.ts`

En el archivo `factura.service.ts`, implementa el método `cargarFacturas` para obtener las facturas desde el backend.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private baseUrl = 'https://localhost:4000/api/factura'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  cargarFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.baseUrl);
  }
}

### Desplegar el método cargarFacturas en facturas.component.ts

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FacturaService } from '../services/factura.service';
import { Factura } from '../models/factura.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  @Output() abrirModalEvent = new EventEmitter<void>();

  dataSource: Factura[] = [];

  constructor(
    private facturaService: FacturaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarFacturas();
  }

  navegarNuevaFactura() {
    this.router.navigate(['formFactura']); // 'formFactura' es la ruta del componente 'formulario-factura'
    console.log("evento nueva factura");
  }

  cargarFacturas(): void {
    this.facturaService.cargarFacturas().subscribe((facturas: Factura[]) => {
      this.dataSource = facturas;
      console.log("Facturas cargadas:", this.dataSource);
    }, (error) => {
      console.error("Error al cargar facturas:", error);
    });
  }
}
