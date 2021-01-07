import { Component, OnInit } from '@angular/core';

import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(public _infoPagService: InfoPaginaService) {}

  ngOnInit(): void {}
}
