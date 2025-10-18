import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  usuarioRegistrado = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log("dd"+ this.usuarioRegistrado)
    let user_state = localStorage.getItem("user_state")

    if (user_state === "true"){
        this.usuarioRegistrado = true
        this.router.navigate([this.router.url]);
        console.log(user_state)
    }
  }

  LogOut(){
    localStorage.removeItem("user_state")
    localStorage.removeItem("userId");
    this.usuarioRegistrado = false;
    this.router.navigate(['AGS/inicio'])
  }
}
