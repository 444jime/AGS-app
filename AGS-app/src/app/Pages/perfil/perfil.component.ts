import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../Services/user.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {
  change_pass: boolean = localStorage.getItem("change_pass") === "true"

  userId = localStorage.getItem("userId")
  user: any
  nombre: any
  apellido: any
  mail: any

  contrasena: any;
  contrasena2: any;

  pass: any;
  pass2: any;
  msg: any;
  passMsg = false;
  idLoggeado: any

  openOptions = false;
  selectedDate: any;

  proyectoCalendar: any;
  horas: any;
  horasYAECHAS: any;

  proyectos: any

  calendarOptions = {
    intinialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    locale: esLocale,
    // events: [
    //   { title}
    // ]
    dateClick: (info: any) => this.handleDateClick(info),
  }

  events: any[] = [];

  constructor(private userService: UserService, private proyectoService: ProyectosService) { }

  ngOnInit(): void {
    // console.log(this.userId)
    this.getUser()
    this.getProyectos()
  }

  getUser() {
    this.userService.GetUserById(this.userId).subscribe(x => {
      this.user = x
      // console.log(x)
      this.nombre = this.user.nombre
      this.apellido = this.user.apellido
      this.mail = this.user.mail
      // console.log(this.mail,this.nombre,this.apellido)      
    })
  }

  changePass() {
    if (!this.validPass(this.pass, this.pass2)) {
      this.passMsg = true;
      return
    }

    let passwords = {
      "NewPassword": this.pass,
      "ConfirmNewPassword": this.pass2
    }
    console.log(passwords)
    this.userService.ChangePass(passwords, this.userId).subscribe(x => {
      console.log(x)
      this.msg = "Contraseña cambiada exitosamente!"
      this.passMsg = true;
      localStorage.setItem("change_pass", "false")
      // window.location.reload();
    })
  }

  //cambiar contraseña
  validPass(pass: any, pass2: any) {
    if (!pass || !pass2) {
      this.msg = "Debes completar ambos campos de contraseña";
      return false;
    }
    if (pass != pass2) {
      this.msg = "Las contraseñas deben ser iguales"
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

  // calendario
  handleDateClick(info: any) {
    this.selectedDate = info.dateStr
    this.openOptions = true
    // console.log
  }

  getHoras(id: any) {
    return this.proyectoService.getProjectId(id);
  }


  // calendario
  createEvent() {
    let proyecto: any
    this.getHoras(this.proyectoCalendar.id).subscribe(x => {
      proyecto = x
      console.log(proyecto.id)
      const horasActuales = proyecto.horas
      const nuevasHoras = Number(horasActuales) + Number(this.horas);
      console.log("horas nuevas", nuevasHoras)

      // SOLO ME FALTA HACER ESTE METODO Y HACER QUE PUEDA ACTUALIZAR SOLO LAS HORAS
      //this.updateProject(proyecto.id, nuevasHoras);
      const event = {
        title: `${this.proyectoCalendar.nombre} - ${this.horas} hs`,
        date: this.selectedDate
      };
      console.log("evento: ", event)

      this.events = [...this.events, event];
      this.openOptions = false;
    })

  }

  updateProject(id:any, nuevasHoras:any) {
    let proj = {

    } 

    // this.proyectoService.editProject(id,proj)
  }

  // traer proyectos
  getProyectos() {
    this.proyectoService.getProject().subscribe(x => {
      this.proyectos = x
      // console.log(x)
    })
  }


  // updateProject(id: number, nuevasHoras: number) {
  //   this.se.put(`http://tu-backend/api/proyectos/${id}`, { horas: nuevasHoras })
  //     .subscribe({
  //       next: () => console.log('Proyecto actualizado con éxito'),
  //       error: (err) => console.error('Error al actualizar', err)
  //     });
  // }

}
