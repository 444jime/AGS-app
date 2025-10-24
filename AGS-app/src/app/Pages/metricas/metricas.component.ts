import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metricas',
  standalone: false,
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent {
  total = 6;
  completos = 2;
  enProgreso = 2;

  get porcentajeCompleto(): number {
    return (this.completos / this.total) * 100;
  }

  get porcentajeProgreso(): number {
    return (this.enProgreso / this.total) * 100;
  }
}

