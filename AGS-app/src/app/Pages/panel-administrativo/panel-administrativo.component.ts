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

  // TODOS / OTROS
  listaUsuarios: any;
  showList = true;
  showCreate = false;
  mensajeError = false; //SACAR
  textoMensaje: string = "";
  mensajeExito: boolean = false;

  // CREACION
  id: any;
  nombre: any;
  apellido: any;
  telefono: any;
  mail: any;
  contrasena: any;

  // LOGEADO
  idLogeado: any;

  // EDICION
  selectedUser: any;
  idEdit: any;
  nombreEdit: any;
  apellidoEdit: any;
  telefonoEdit: any;
  mailEdit: any;

  // ELIMINAR
  idDelete: any;

  // DETALLES
  detallesUsuario: any;
  fechaAlta: any;
  creadoPor: any;
  fechaBaja: any;
  eliminadoPor: any;
  estaEliminado: any;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
    this.idLogeado = localStorage.getItem("userId")
    // console.log(this.idLogeado)
    const hoy = new Date()
    this.fechaAlta = hoy.toLocaleDateString("es-AR")
  }

  // NAVBAR
  show(tipo: 'lista' | 'crear', event: Event) {
    event.preventDefault();
    this.showCreate = tipo === 'crear';
    this.showList = tipo === 'lista';
  }

  // MENSAJE EXITO
  mostrarExito(mensaje: string) {
    this.textoMensaje = mensaje;
    this.mensajeExito = true;

    setTimeout(() => {
      this.mensajeExito = false;
    }, 3000);
  }

  // RESETEO FORMULARIO
  resetFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.mail = undefined;
    this.telefono = '';
    this.contrasena = '';
  }

  // TABLA (listo, faltaria poder ver usuarios eliminados)
  getUsers() {
    this.userService.GetUsers().subscribe(x => {
      this.listaUsuarios = x
    })
  }

  // DETALLES (listo)
  getUsersById(id: any) {
    this.detallesUsuario = null;

    this.userService.GetUserById(id).subscribe({
      next: (data) => {
        this.detallesUsuario = data;
      },
      error: (err) => console.error(err)
    })
  }

  // EDITAR (listo)
  EditValues(user: any) {
    this.selectedUser = { ...user }
    this.idEdit = user.id
    this.nombreEdit = user.nombre
    this.apellidoEdit = user.apellido
    this.mailEdit = user.mail
    this.telefonoEdit = user.telefono
  }

  // (listo), sacar el requiere cambio
  editarUser() {
    let user = {
      id: this.idEdit,
      nombre: this.nombreEdit,
      apellido: this.apellidoEdit,
      mail: this.mailEdit,
      telefono: this.telefonoEdit,
      requiere_cambio_contrasena: "false" //MOMENTANEO, SACAR DSP
    }

    this.userService.EditUser(user.id, user).subscribe({
      next: () => {
        this.getUsers();
        const btn = document.getElementById('btnCerrarEditar');
        if (btn) btn.click();

        this.mostrarExito("Los cambios del usuario fueron guardados.");
      },
      error: err => console.error(err)
    })
  }

  // ELIMINAR (listo)
  getId(id: any) {
    this.idDelete = id
  }

  deleteUser() {
    this.userService.DeleteUser(this.idDelete).subscribe({
      next: () => {
        this.getUsers();
        const btn = document.getElementById('btnCerrarEliminar');
        if (btn) btn.click();

        this.mostrarExito("El usuario fue dado de baja exitosamente.");
      },
      error: err => console.error(err)
    })
  }

  // CREAR (FALTA)
  createUser() {
    let user = {
      id: 0,
      nombre: this.nombre,
      apellido: this.apellido,
      mail: this.mail,
      contrasena: this.contrasena,
      telefono: this.telefono,
      requiere_cambio_contrasena: "true", //no debe pedir
      fechaAlta: this.fechaAlta,
      creadoPor: this.idLogeado,
      fechaBaja: null, //no debe pedir
      eliminadoPor: null, //no debe pedir
      estaEliminado: false  //no debe pedir
    }

    console.log(user)
    this.userService.CreateUser(user).subscribe({
      next: () => {
        this.getUsers();
        this.resetFormulario();

        this.mostrarExito("El usuario ha sido creado correctamente.");
      },
      error: err => console.error(err)
    })
  }
}
