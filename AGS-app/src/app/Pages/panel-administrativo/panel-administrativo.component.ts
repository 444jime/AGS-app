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
  change_pass: boolean = localStorage.getItem("change_pass") === "true"
  contrasena: any;
  contrasena2: any;

  dataSourceUser: any;
  id: any;
  nombre: any;
  apellido: any;
  telefono: any;
  mail: any;
  pass: any;
  pass2: any;
  msg: any;
  passMsg = false;
  listaUsuarios: any;
  selectedUser: any;
  showCreate = false;
  showList = true;
  idLoggeado: any
  idDelete: any
  mensajeExito = false
  mensajeError = false

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.idLoggeado = localStorage.getItem("userId")
    // if (this.id){
    //   this.getUser(this.id)
    // }
    this.getUsers()
  }

  show(tipo: 'lista' | 'crear', event: Event) {
    event.preventDefault();
    this.showCreate = tipo === 'crear';
    this.showList = tipo === 'lista';
  }

  getUsers() {
    this.userService.GetUsers().subscribe(x => {
      this.listaUsuarios = x
      console.log(this.listaUsuarios)
    })
  }

  EditValues(user: any) {
    this.selectedUser = { ...user }
    this.id = user.id
    this.nombre = user.nombre
    this.apellido = user.apellido
    this.mail = user.mail
    this.telefono = user.telefono
  }

  editarUser() {
    let user = {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      mail: this.mail,
      telefono: this.telefono
    }
    // console.log(user)
    this.userService.EditUser(user.id, user).subscribe(x => {
      // console.log("rta del edituser",x)
      // location.reload()
    })

  }

  getId(id: any) {
    this.idDelete = id
    // console.log(id)
  }

  deleteUser() {
    // console.log('id:',this.idDelete)
    this.userService.DeleteUser(this.idDelete).subscribe(x => {
      location.reload()
    })
  }

  createUser() {
    let user = {
      id: 0,
      nombre: this.nombre,
      apellido: this.apellido,
      mail: this.mail,
      contrasena: this.contrasena,
      telefono: this.telefono,
      requiere_cambio_contrasena: "true"
    }
    this.userService.CreateUser(user).subscribe({
      next: (res) => {
        this.mensajeExito = true
        this.mensajeError = false
        this.getUsers()
        this.nombre = ''
        this.apellido = ''
        this.mail = ''
        this.contrasena = ''
        this.telefono = ''
      },
      error: (err) => {
        this.mensajeError = true
        this.mensajeExito = false
      }
    })
  }

  // LO VOY A USAR PARA CAMBIAR LA PASS MAYBE, VEO, POR AHORA NO LO USO
  // getUser(id:any){
  //   // console.log(this.id)
  //   this.userService.GetUserById(id).subscribe( x => {
  //     this.dataSourceUser = x
  //     // console.log(this.dataSourceUser)
  //     // this.mail = this.dataSourceUser[0].mail
  //     // this.apellido = this.dataSourceUser[0].apellido
  //     // this.nombre = this.dataSourceUser[0].nombre
  //     // this.telefono = this.dataSourceUser[0].telefono
  //   })
  // }

  // changePass(){
  //   if(!this.validPass(this.pass,this.pass2)){
  //     this.passMsg = true;
  //     return
  //   }

  //   this.userService.ChangePass(this.pass,this.id).subscribe( x => {        
  //     console.log(x)
  //     this.msg = "Contraseña cambiada exitosamente!"
  //     this.passMsg = true;
  //     localStorage.setItem("change_pass", "false")
  //     window.location.reload();
  //   })
  // }

  validPass(pass: any, pass2: any) {
    if (pass != pass2) {
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
