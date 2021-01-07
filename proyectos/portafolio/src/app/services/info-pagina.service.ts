import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InfoPagina } from '../interfaces/info-pagina.interface';
import { EquipoPagina } from '../interfaces/equipo-interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  dataInfo: InfoPagina = {};
  cargada = false;
  equipo: EquipoPagina[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http
      .get<InfoPagina>('assets/data/data-pagina.json')
      .subscribe((data) => {
        this.cargada = true;
        this.dataInfo = data;
      });
  }

  private cargarEquipo() {
    this.http
      .get<EquipoPagina[]>(
        'https://angular-html-a649a-default-rtdb.firebaseio.com/equipo.json'
      )
      .subscribe((data) => {
        this.equipo = data;
      });
  }
}
