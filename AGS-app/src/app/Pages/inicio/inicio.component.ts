import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../Services/proyectos.service';
import { ImagenesService } from '../../Services/imagenes.service';
import { ServiciosEmpresaService } from '../../Services/servicios-empresa.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  
  images:any;
  imagenHeader:any;
  imagesCarrousel:any;
  carrousel:any[]=[];
  servicios:any;

  constructor(private imagenesSercive:ImagenesService, private proyectosService: ProyectosService, private ServiciosService: ServiciosEmpresaService) {}

  ngOnInit(): void {
    this.getImages()
    this.getProyectos()
    this.getServicios()
  }

  getImages(){
    this.imagenesSercive.getImages().subscribe({
      next: (res) => {
        this.images = res
        const header = this.images.find((img: any) => img.nombre === "Aeropuerto SMA 2")
        this.imagenHeader = header ? header.url : ''
        // console.log(this.imagenHeader)
      },
      error: (err) => console.error(err)
    })
  }

  getProyectos(){
    this.proyectosService.getProject().subscribe(x=>{
      this.imagesCarrousel = x
      for (let i of this.imagesCarrousel){
        // console.log(i)
        this.carrousel.push(i)
      }
      console.log(this.carrousel)
    })
  }

  getServicios() {
    this.ServiciosService.getServices().subscribe( x => {
      this.servicios = x
      console.log(x)
    })
  }
  
}
