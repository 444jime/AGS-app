import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'app-metricas',
  standalone: false,
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent implements OnInit {

  proyectos: any;
  totalHoras: any;
  cantProyectos: any;
  promedioHoras: any;

  proyectosPorMes: any[] = [];
  proyectosPorEstado: {
    finalizado: number,
    enProgreso: number,
    pendiente: number,
    total: number
  } = { finalizado: 0, enProgreso: 0, pendiente: 0, total: 0 };

  constructor(private proyectoService: ProyectosService) { }

  ngOnInit(): void {
    this.getProyectos()
  }

  getHorasMaximas(): number {
    if (this.proyectos.length === 0) {
      return 0;
    }
    const horas = this.proyectos.map(p => p.horas);
    return Math.max(...horas);
  }

  getAnchoBarra(horasTrabajadas: number): string {
    const maxHoras = this.getHorasMaximas();
    if (maxHoras === 0) {
      return '0%';
    }
    const porcentaje = (horasTrabajadas / maxHoras) * 100;
    return `${porcentaje}%`;
  }

  getClaseEstado(estado: string): string {
    switch (estado) {
      case 'Finalizado':
        return 'bg-success';
      case 'En progreso':
        return 'bg-primary';
      case 'Pendiente':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  getClaseEtiquetaEstado(estado: string): string {
    switch (estado) {
      case 'Finalizado':
        return 'badge estado-completado';
      case 'En progreso':
        return 'badge estado-progreso';
      case 'Pendiente':
        return 'badge estado-planificado';
      default:
        return 'badge bg-secondary';
    }
  }

  getProyectos() {
    this.proyectoService.getProject().subscribe(x => {
      this.proyectos = x
      this.totalHoras = this.proyectos.reduce((acumulador, proyecto) => {
        return acumulador + (proyecto.horas || 0)
      }, 0)

      this.cantProyectos = this.proyectos.length

      if (this.cantProyectos > 0) {
        const calculoPromedio = this.totalHoras / this.cantProyectos
        this.promedioHoras = Math.round(calculoPromedio)
      } else {
        this.promedioHoras = 0
      }
      this.procesarProyectosPorMes();
      this.calcularConteoPorEstado();
    })
  }

  procesarProyectosPorMes() {
    const stats: { [key: string]: { total: number, estados: { [key: string]: number } } } = {};
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    this.proyectos.forEach((p: any) => {
      const fecha = new Date(p.fecha_inicio + 'T00:00:00');
      const mesIndex = fecha.getMonth();
      const mesNombre = meses[mesIndex];
      const estadoNormalizado = p.estado; 

      if (!stats[mesNombre]) {
        stats[mesNombre] = { total: 0, estados: {} };
      }

      stats[mesNombre].total++;

      if (!stats[mesNombre].estados[estadoNormalizado]) {
        stats[mesNombre].estados[estadoNormalizado] = 0;
      }

      stats[mesNombre].estados[estadoNormalizado]++;
    });

    this.proyectosPorMes = Object.keys(stats).map(mes => {
      const total = stats[mes].total;
      const estados = Object.keys(stats[mes].estados).map(estado => ({
        estado: estado,
        conteo: stats[mes].estados[estado],
        porcentaje: (stats[mes].estados[estado] / total) * 100,
        clase: this.getClaseEstado(estado) 
      }));

      return {
        mes: mes,
        total: total,
        estados: estados
      };
    });

    this.proyectosPorMes.sort((a, b) => meses.indexOf(a.mes) - meses.indexOf(b.mes));
  }

  calcularConteoPorEstado() {
    this.proyectosPorEstado = { finalizado: 0, enProgreso: 0, pendiente: 0, total: this.proyectos.length };

    this.proyectos.forEach((p: any) => {
      switch (p.estado) {
        case 'Finalizado':
          this.proyectosPorEstado.finalizado++;
          break;
        case 'En progreso':
          this.proyectosPorEstado.enProgreso++;
          break;
        case 'Pendiente':
          this.proyectosPorEstado.pendiente++;
          break;
      }
    });
  }
}