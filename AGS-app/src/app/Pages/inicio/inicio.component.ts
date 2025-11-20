import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  
  images:any;
  imagenHeader:any;
  constructor(private proyectosService:ProyectosService) {}

  ngOnInit(): void {
    this.getImages()
  }

  getImages(){
    this.proyectosService.getImages().subscribe({
      next: (res) => {
        this.images = res
        const header = this.images.find((img: any) => img.nombre === "Aeropuerto SMA 2")
        this.imagenHeader = header ? header.url : ''
        console.log(res)
        console.log(this.imagenHeader)
      },
      error: (err) => console.error(err)
    })
  }
  
}
