import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenesService } from '../../Services/imagenes.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {

  usuarioRegistrado: boolean = localStorage.getItem("user_state") === "true"
  images: any
  logo: any

  constructor(private router: Router, private servicio: ImagenesService) { }

  ngOnInit(): void {
    this.getLogo()
  }

  LogOut() {
    localStorage.clear()
    this.usuarioRegistrado = false;
    this.router.navigate(['AGS/inicio'])
  }

  getLogo() {
    this.servicio.getImages().subscribe({
      next: (res) => {
        this.images = res
        const logoImage = this.images.find((img: any) => img.nombre === "LOGO AGS 2")
        this.logo = logoImage ? logoImage.url : ''        
      },
      error: (err) => console.error(err)
    })
  }
}
