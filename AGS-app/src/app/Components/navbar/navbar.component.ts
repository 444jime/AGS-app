import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenesService } from '../../Services/imagenes.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  usuarioRegistrado: boolean = localStorage.getItem("user_state") === "true"
  images: any
  logo: string ='/img/LOGO_AGS.png'

  constructor(private router: Router) { }

  LogOut() {
    localStorage.clear()
    this.usuarioRegistrado = false;
    this.router.navigate(['AGS/inicio'])
  }

}
