import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  standalone: false,
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.css'
})
export class InicioAdminComponent implements OnInit {
  userId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user_state = localStorage.getItem("user_state");

    if (user_state !== "true") {
      this.router.navigate(['AGS/inicio']);
      return;
    }

    this.userId = localStorage.getItem("userId");

    if (!this.userId) {
       this.router.navigate(['AGS/inicio']);
    }
  }

}