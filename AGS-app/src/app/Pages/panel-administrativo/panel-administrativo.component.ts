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
  id: any;
  nombre: any;
  apellido: any;
  telefono: any;
  mail: any;
  contrasena: any;  
  listaUsuarios: any;
  selectedUser: any;
  idDelete: any;
  showList = true;
  showCreate = false;
  mensajeExito = false;
  mensajeError = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
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
    // TODAVIA NO
    // this.userService.EditUser(user.id, user).subscribe(x => {
    //   console.log("rta del edituser",x)
    //   // location.reload()
    // })
  }

  getId(id: any) {
    this.idDelete = id
  }

  deleteUser() {
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
}
