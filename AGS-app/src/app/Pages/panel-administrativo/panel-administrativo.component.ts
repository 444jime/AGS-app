import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-panel-administrativo',
  standalone: false,
  templateUrl: './panel-administrativo.component.html',
  styleUrl: './panel-administrativo.component.css'
})
export class PanelAdministrativoComponent implements OnInit {

  // TODOS / OTROS
  todosLosUsuarios: any[] = [];
  listaUsuarios: any;
  estadoActual: 'activo' | 'inactivo' = 'activo'
  showList = true;
  showCreate = false;
  mensajeError = false;
  textoMensaje: string = "";
  mensajeExito: boolean = false;
  textoError:any;
  loading = false;

  // CREACION
  id: any;
  nombre: any;
  apellido: any;
  telefono: any;
  mail: any;
  contrasena: any;

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
  creadoPor: any;
  fechaBaja: any;
  eliminadoPor: any;
  estaEliminado: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserByStatus(this.estadoActual)
    this.getUsers()
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

  // TABLA
  getUsersActivos() {
    this.userService.GetUsers('activo').subscribe(x => {
      this.listaUsuarios = x
    })
  }

  // TODOS LOS USUARIOS
  getUsers() {
    this.loading = true;

    forkJoin({
      activos: this.userService.GetUsers('activo'),
      inactivos: this.userService.GetUsers('inactivo')
    }).subscribe({
      next: (resultado: any) => {
        this.todosLosUsuarios = [...resultado.activos, ...resultado.inactivos];        
        this.filtrarLista();

        this.loading = false;
      },
      error: (err) => {
        console.error("Error cargando usuarios:", err);
        this.listaUsuarios = [];
        this.loading = false;
      }
    });
  }

  // FILTROS
  filtrarLista() {
    if (this.estadoActual === 'activo') {
      this.listaUsuarios = this.todosLosUsuarios.filter(u => u.fechaBaja === null);
    } else {
      this.listaUsuarios = this.todosLosUsuarios.filter(u => u.fechaBaja !== null);
    }
  }

  // USUARIOS ACTIVOS / INACTIVOS
  getUserByStatus(status: 'activo' | 'inactivo') {
    this.estadoActual = status;
    this.filtrarLista();
  }

  // DETALLES
  getUsersById(id: any) {
    this.detallesUsuario = null;

    this.userService.GetUserById(id).subscribe({
      next: (data) => {
        this.detallesUsuario = data;
      },
      error: (err) => console.error(err)
    })
  }

  // EDITAR
  EditValues(user: any) {
    this.selectedUser = { ...user }
    this.idEdit = user.id
    this.nombreEdit = user.nombre
    this.apellidoEdit = user.apellido
    this.mailEdit = user.mail
    this.telefonoEdit = user.telefono
  }

  editarUser() {
    let user = {
      id: this.idEdit,
      nombre: this.nombreEdit,
      apellido: this.apellidoEdit,
      mail: this.mailEdit,
      telefono: this.telefonoEdit,
      requiere_cambio_contrasena: "false"
    }

    this.userService.EditUser(user.id, user).subscribe({
      next: () => {
        this.getUsersActivos();
        this.getUsers();
        const btn = document.getElementById('btnCerrarEditar');
        if (btn) btn.click();

        this.mostrarExito("Los cambios del usuario fueron guardados.");
      },
      error: err => console.error(err)
    })
  }

  // ELIMINAR
  getId(id: any) {
    this.idDelete = id
  }

  deleteUser() {
    this.userService.DeleteUser(this.idDelete).subscribe({
      next: () => {
        this.getUsersActivos();
        this.getUsers();
        const btn = document.getElementById('btnCerrarEliminar');
        if (btn) btn.click();

        this.mostrarExito("El usuario fue dado de baja exitosamente.");
      },
      error: err => console.error(err)
    })
  }

  // CREAR
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
      next: (data: any) => {        
        if (data.result === true) {
          this.mensajeError = false

          this.getUsers();
          this.getUsersActivos();
          this.resetFormulario();
          this.mostrarExito("El usuario ha sido creado correctamente.");

        } else {
          this.mensajeError = true
          this.textoError = data.message
          console.warn("El backend rechazó la creación:", data.message);
        }
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
