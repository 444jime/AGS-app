import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../Services/proyectos.service';
import { ServiciosEmpresaService } from '../../Services/servicios-empresa.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  
  loadingProyectos = false;
  loadingServicios = false;
  images:any;
  imagenHeader:string = 'img/HEADER.jpg';
  imagesCarrousel:any;
  carrousel:any[]=[];
  servicios:any;

  iconos: string[] = [
    'bi-droplet',
    'bi-fire',
    'bi-shield-check',
    'bi-file-text',
    'bi-diagram-3',
    'bi-building',
    'bi-journal-text',
    'bi-pencil-square',
    'bi-grid-1x2'
  ];

  constructor(private proyectosService: ProyectosService, private ServiciosService: ServiciosEmpresaService) {}

  ngOnInit(): void {
    this.getProyectos()
    this.getServicios()
  }  

  getProyectos(){
    this.loadingProyectos = true;
    this.proyectosService.getPublicProject().subscribe(x=>{
      this.imagesCarrousel = x
      for (let i of this.imagesCarrousel){   
        this.carrousel.push(i)
      }
      this.loadingProyectos = false;
    })
  }

  getServicios() {
    this.loadingServicios = true;
    this.ServiciosService.getServices().subscribe( x => {
      this.servicios = x      
      this.loadingServicios = false;
    })
  }
  
}
