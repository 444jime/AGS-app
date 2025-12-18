import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  mail: any = '';
  pass: any = '';

  msg: any = '';
  mailError: string = '';
  showErrorAnimation: boolean = false;

  dataSourceLogin: any;
  loading: boolean = false;

  ngOnInit(): void {
    localStorage.clear()
  }

  triggerAnimation() {
    this.showErrorAnimation = false;
    setTimeout(() => {
      this.showErrorAnimation = true;
    }, 10);
  }

  Login() {
    this.msg = "";

    if (!this.mail || this.mail.trim() === '' || !this.pass || this.pass.trim() === '') {
      this.msg = "Por favor, completa todos los campos.";
      this.triggerAnimation();
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.mail)) {
      this.msg = "El formato del correo electronico no es valido";
      this.triggerAnimation();
      return;
    }

    let obj = {
      "mail": this.mail,
      "pass": this.pass
    }
    
    this.loading = true;
    this.msg = '';

    this.userService.Login(obj).subscribe({
      next: (x) => {
        this.dataSourceLogin = x;
        this.loading = false;

        if (this.dataSourceLogin.result == true) {
          localStorage.setItem("token", this.dataSourceLogin.token)
          localStorage.setItem("user_state", "true")

          this.userService.GetUsers('activo').subscribe((res: any[]) => {
            const user = res.find((n: any) => n.mail === this.mail);

            if (user) {
              localStorage.setItem("userId", user.id)

              if (this.dataSourceLogin.contrasena == true) {
                localStorage.setItem("change_pass", "true")
                this.router.navigate(["AGS/perfil"])
              } else {
                this.router.navigate(["AGS/admin"])
              }
            }
          })
        } else {
          this.msg = this.dataSourceLogin.message
          this.triggerAnimation();
          this.loading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.msg = "Ocurrió un error al intentar conectar con el servidor.";
        this.triggerAnimation();
      }
    })
  }
}