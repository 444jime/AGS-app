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
      console.log(this.dataSourceLogin)
      console.log(this.dataSourceLogin.contrasena)


      if (this.dataSourceLogin.result == true) {
        localStorage.setItem("user_state", "true")

        this.userService.GetUsers().subscribe( x => {
          const users = x as any[];
          const user = users.find((n:any) => n.mail === this.mail)
          localStorage.setItem("userId", user.id)
          console.log("login",user.id)
          if(this.dataSourceLogin.contrasena == true){
            console.log(this.dataSourceLogin.contrasena)
            localStorage.setItem("change_pass", this.dataSourceLogin.contrasena)  
            this.router.navigate(["AGS/panel"])      
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
