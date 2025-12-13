import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../Services/user.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ProyectosService } from '../../Services/proyectos.service';
import { EventosService } from '../../Services/eventos.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {
  change_pass: boolean = localStorage.getItem("change_pass") === "true"

  // INFO USER
  userId = localStorage.getItem("userId")
  user: any
  nombre: any
  apellido: any
  mail: any

  // CAMBIAR CONTRASEÑA
  pass: any;
  pass2: any;
  msg: any;
  passMsg = false;

  // EVENTO CALENDARIO
  eventoSeleccionado: any = null;
  showModalEvento: boolean = false;
  openOptions = false;
  selectedDate: any;
  proyectoCalendar: any;
  horas: any;
  events: any[] = [];
  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    locale: esLocale,
    dateClick: (info: any) => this.handleDateClick(info),
    eventClick: (info: any) => this.handleEventClick(info) 
  }

  // TODO
  proyectos: any;
  cantidadActivos: any;
  horasMesActual: any
  textoMensaje: string = "";
  mensajeExito: boolean = false;
  loading = false;
  loadingUser = false;


  constructor(
    private userService: UserService,
    private proyectoService: ProyectosService,
    private eventosService: EventosService) { }

  ngOnInit(): void {
    this.getUser()
    this.getProyectos()
    this.getEventos()
  }

  // USUARIO
  getUser() {
    this.loadingUser = true;

    this.userService.GetUserById(this.userId).subscribe(x => {
      this.user = x
      this.nombre = this.user.nombre
      this.apellido = this.user.apellido
      this.mail = this.user.mail
      this.loadingUser = false;
    })
  }

  // PROYECTOS SOLO ACTIVOS
  getProyectos() {
    this.loading = true;
    this.proyectoService.getProject().subscribe((data: any[]) => {

      let filtrados = data.filter(p =>
        p.estado === 'En progreso' || p.estado === 'Pendiente'
      )

      this.proyectos = filtrados.sort((a, b) => {
        if (a.estado === 'En progreso' && b.estado !== 'En progreso') return -1;
        if (a.estado !== 'En progreso' && b.estado === 'En progreso') return 1;
        return 0;
      })

      this.cantidadActivos = this.proyectos.length;
      this.loading = false
    })
  }

  // EVENTOS
  getEventos() {
    this.eventosService.GetEventos().subscribe({
      next: (res: any[]) => {

        this.events = res.map(item => ({
          title: `${item.nombre} - ${item.horas} hs`,
          date: item.fecha,
          horas: Number(item.horas)
        }))
        this.calcularHorasMesActual()
      },
      error: err => console.error(err)
    })
  }

  // VER EVENTO
  handleEventClick(clickInfo: any) {
    this.eventoSeleccionado = {
      titulo: clickInfo.event.title,
      fecha: clickInfo.event.startStr,
      horas: clickInfo.event.extendedProps.horas,
    };

    const btn = document.getElementById('btnVerDetallesEvento');
    if (btn) btn.click();
  }

  // CALCULAR HORAS
  calcularHorasMesActual() {
    const hoy = new Date();
    const mesActual = hoy.getMonth()
    const anioActual = hoy.getFullYear()

    this.horasMesActual = this.events.reduce((total, evento) => {
      const fechaEvento = new Date(evento.date + 'T00:00:00')

      if (fechaEvento.getMonth() === mesActual && fechaEvento.getFullYear() === anioActual) {
        return total + (evento.horas || 0)
      }
      return total;
    }, 0)

  }

  // MENSAJE EXITO
  mostrarExito(mensaje: string) {
    this.textoMensaje = mensaje;
    this.mensajeExito = true;

    setTimeout(() => {
      this.mensajeExito = false;
    }, 3000);
  }

  // FORMULARIO
  resetFormulario() {
    this.pass = '';
    this.pass2 = '';
  }

  // CAMIAR CONTRASEÑA
  changePass() {
    if (!this.validPass(this.pass, this.pass2)) {
      this.passMsg = true;
      return
    }

    let passwords = {
      "NewPassword": this.pass,
      "ConfirmNewPassword": this.pass2
    }

    this.userService.ChangePass(passwords, this.userId).subscribe({
      next: () => {
        this.getUser();
        this.resetFormulario();

        const btn = document.getElementById('btnCerrarC');
        if (btn) btn.click();

        this.mostrarExito("La contraseña fue cambiada exitosamente.");
        localStorage.setItem("change_pass", "false")
        this.change_pass = false;
      },
      error: err => console.error(err)
    })
  }

  //VALIDAR contraseña
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

  // INFO DEL CLICK CALENADRIO
  handleDateClick(info: any) {
    this.selectedDate = info.dateStr
    this.openOptions = true
  }

  // CALENDARIO
  getHoras(id: any) {
    return this.proyectoService.getProjectId(id);
  }

  // CALENDARIO
  createEvent() {
    let proyecto: any
    this.getHoras(this.proyectoCalendar.id).subscribe(x => {
      proyecto = x
      const horasActuales = proyecto.horas
      const nuevasHoras = Number(horasActuales) + Number(this.horas);

      this.updateProject(proyecto.id, nuevasHoras);
      const eventVisual = {
        title: `${this.proyectoCalendar.nombre} - ${this.horas} hs`,
        date: this.selectedDate,
        horas: Number(this.horas)
      };

      let eventoParaBD = {
        nombre: this.proyectoCalendar.nombre,
        horas: this.horas,
        fecha: this.selectedDate
      }

      this.eventosService.PostEvento(eventoParaBD).subscribe({
        next: res => console.log(res),
        error: err => console.log(err)
      })

      this.events = [...this.events, eventVisual];
      this.calcularHorasMesActual();
      this.openOptions = false;
      this.getProyectos();
    })

  }

  // ACTUALIZAR HORAS PROYECTO
  updateProject(id: any, nuevasHoras: any) {
    this.proyectoService.editProjectByHours(id, nuevasHoras).subscribe({
      next: res => console.log(res),
      error: err => console.error(err)
    })

    this.getProyectos()
    this.calcularHorasMesActual()
  }

}
