import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  standalone: false,
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.css'
})
export class InicioAdminComponent implements OnInit {
  userId: any

  constructor (private router: Router) {}

  ngOnInit(): void {
      let user_state = localStorage.getItem("user_state")
      if (user_state === "true"){
        const idGuardado = localStorage.getItem("userId")

        if (idGuardado){
          this.userId = idGuardado
          // que cargue toda la pag
        } else {
          const esperarId = setInterval(() => {
            const userId = localStorage.getItem("userId")
            if (userId) {
              clearInterval(esperarId)
              this.userId = userId
              // cargamos los datos del usuario
            }
          }, 100);
        }
      } else {
        this.router.navigate(['AGS/inicio'])
      }
  }
}
