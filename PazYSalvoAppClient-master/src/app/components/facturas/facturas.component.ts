import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FacturaService } from '../services/factura.service'; // Asegúrate de que la ruta es correcta
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
