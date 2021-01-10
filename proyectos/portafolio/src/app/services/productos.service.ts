import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

import { IDetalleProducto, IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  productos: IProducto[] = [];
  productosFiltrado: IProducto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve) => {
      this.http
        .get<IProducto[]>(
          'https://angular-html-a649a-default-rtdb.firebaseio.com/productos_idx.json'
        )
        .pipe(delay(1000))
        .subscribe((response) => {
          this.productos = response;
          this.cargando = false;
          resolve('');
        });
    });
  }

  public obtenerProducto(id: string) {
    return this.http.get<IDetalleProducto>(
      `https://angular-html-a649a-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  public buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    this.productosFiltrado = this.productos.filter(
      (producto) =>
        producto.categoria.toLowerCase().includes(termino) ||
        producto.titulo.toLowerCase().includes(termino)
    );
  }
}
