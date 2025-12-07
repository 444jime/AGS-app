import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor ( 
    private userService: UserService, 
    private router : Router) {}

  mail:any;
  pass:any;
  msg:any;
  dataSourceLogin:any;

  ngOnInit(): void {
    localStorage.removeItem("user_state")
    localStorage.removeItem("userId")
    localStorage.removeItem("change_pass")
    localStorage.removeItem("token")

    const esperarId = setInterval(() => {
      const userId = this.userService.getUserId()
      if(userId){
        clearInterval(esperarId)
      }
    }, 100)
  }

  Login(){
    let obj = {
      "mail" : this.mail,
      "pass" : this.pass
    }

    this.userService.Login(obj).subscribe( x => {
      this.dataSourceLogin = x;
      // console.log(this.dataSourceLogin.token)
      localStorage.setItem("token", this.dataSourceLogin.token)

      if (this.dataSourceLogin.result == true) {
        localStorage.setItem("user_state", "true")

        this.userService.GetUsers('activo').subscribe( x => {
          const users = x as any[];
          const user = users.find((n:any) => n.mail === this.mail)
          localStorage.setItem("userId", user.id)
          console.log("login",user.id)
          if(this.dataSourceLogin.contrasena == true){
            localStorage.setItem("change_pass", this.dataSourceLogin.contrasena)  
            this.router.navigate(["AGS/perfil"])      
          }
        })

        this.router.navigate(["AGS/admin"])

      }
      else {
        this.msg = this.dataSourceLogin.message
      }
    })
    
  }
}
