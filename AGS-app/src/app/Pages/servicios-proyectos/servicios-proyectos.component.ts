import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios-proyectos',
  standalone: false,
  templateUrl: './servicios-proyectos.component.html',
  styleUrl: './servicios-proyectos.component.css'
})
export class ServiciosProyectosComponent {

  showProyects = false;
  showServices = true;

  show(tipo: 'proyectos' | 'servicios', event: Event) {
    event.preventDefault();
    this.showProyects = tipo === 'proyectos';
    this.showServices = tipo === 'servicios';
  }
}
