import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { IDetalleProducto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  detalleProducto: IDetalleProducto = {};
  id = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
      this.productoService
        .obtenerProducto(id)
        .subscribe(
          (detalleProductos) => (this.detalleProducto = detalleProductos)
        );
    });
  }
}
