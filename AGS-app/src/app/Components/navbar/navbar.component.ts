import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuarioRegistrado :boolean = localStorage.getItem("user_state") === "true"

  constructor(private router: Router) {}
  
  LogOut(){
    localStorage.removeItem("user_state")
    localStorage.removeItem("userId");
    this.usuarioRegistrado = false;
    this.router.navigate(['AGS/inicio'])
  }
}
