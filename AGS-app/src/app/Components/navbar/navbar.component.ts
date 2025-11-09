import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  usuarioRegistrado :boolean = localStorage.getItem("user_state") === "true"
  images:any
  log:any

  constructor(private router: Router, private servicio: ProyectosService ) {}
  
  ngOnInit(): void {
    this.getLogo()
    console.log(this.images)
  }
  
  LogOut(){
    localStorage.removeItem("user_state")
    localStorage.removeItem("userId");
    this.usuarioRegistrado = false;
    this.router.navigate(['AGS/inicio'])
  }

  getLogo(){
    this.servicio.getImages().subscribe( x => {
      this.images = x
      console.log(this.images)
      console.log(x)

    })
  }
}
