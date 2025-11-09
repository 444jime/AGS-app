import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-administrativo',
  standalone: false,
  templateUrl: './panel-administrativo.component.html',
  styleUrl: './panel-administrativo.component.css'
})
export class PanelAdministrativoComponent implements OnInit {
  change_pass:boolean = localStorage.getItem("change_pass") === "true"
  contrasena:any;
  contrasena2:any;

  dataSourceUser:any;
  id:any;
  nombre:any;
  apellido:any;
  telefono:any;
  mail:any;
  pass:any;
  pass2:any;
  msg:any;
  passMsg = false;

  constructor (private userService : UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.id = localStorage.getItem("userId")
    if (this.id){
      this.getUser(this.id)
    }
  }

  getUser(id:any){
    console.log(this.id)
    this.userService.GetUserById(id).subscribe( x => {
      this.dataSourceUser = x
      console.log(this.dataSourceUser[0].mail)
      this.mail = this.dataSourceUser[0].mail
      this.apellido = this.dataSourceUser[0].apellido
      this.nombre = this.dataSourceUser[0].nombre
      this.telefono = this.dataSourceUser[0].telefono
    })
  }

  changePass(){
    if(!this.validPass(this.pass,this.pass2)){
      this.passMsg = true;
      return
    }

    this.userService.ChangePass(this.pass,this.id).subscribe( x => {        
      console.log(x)
      this.msg = "Contraseña cambiada exitosamente!"
      this.passMsg = true;
      localStorage.setItem("change_pass", "false")
      window.location.reload();
    })
  }

  validPass(pass:any,pass2:any){
    if(pass != pass2){
      this.msg = "las contraseñas deben ser iguales"
      return false;
    }

    if (pass.length < 8) {
      this.msg = "La contraseña debe tener al menos 8 caracteres"
      return false;
    }

    const specialCharRegex = /[^a-zA-Z0-9]/
    if (!specialCharRegex.test(pass)) {
      this.msg = "La contraseña debe tener al menos un caracter especial"
      return false
    }

    return true;
  }

}
