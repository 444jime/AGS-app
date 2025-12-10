import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  usuarioRegistrado: boolean = false;
  images: any
  logo: string ='/img/LOGO_AGS_LETRAS.png'

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.usuarioRegistrado = localStorage.getItem("user_state") === "true";
    }
  }

  LogOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.usuarioRegistrado = false;
      this.router.navigate(['AGS/inicio']);
    }
  }

}
