import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../Services/proyectos.service';
import { ServiciosEmpresaService } from '../../Services/servicios-empresa.service';

@Component({
  selector: 'app-servicios-proyectos',
  standalone: false,
  templateUrl: './servicios-proyectos.component.html',
  styleUrl: './servicios-proyectos.component.css'
})
export class ServiciosProyectosComponent implements OnInit {

  // CAMBIAR DESPUES
  showProyects = false;
  showServices = true;

  proyectos: any;
  nombre: any;
  descripcion: any;
  fileProyecto!: File;

  selectedProject: any;
  id: any
  nombreEdit: any;
  descripcionEdit: any;
  fileEdit!: File;
  horasEdit: any;
  estadoEdit: any;
  fechaInicioEdit: any;
  fechaFinEdit: any;

  idDelete: any;
  fechaActual: string = "";

  servicios: any;
  nombreServicio: any;
  descServicio: any;
  fileServicio!: File;

  selectedService: any;
  idServicio: any;
  nombreServicioEdit: any;
  descripcionServicioEdit: any;

  idDeleteService:any;


  constructor(private proyectosService: ProyectosService, private serviciosService: ServiciosEmpresaService) { }

  ngOnInit(): void {
    this.getProyectos()
    const hoy = new Date()
    this.fechaActual = hoy.toLocaleDateString("es-AR")
    this.getServicios()
  }

  show(tipo: 'proyectos' | 'servicios', event: Event) {
    event.preventDefault();
    this.showProyects = tipo === 'proyectos';
    this.showServices = tipo === 'servicios';
  }

  // PROYECTOS
  getProyectos() {
    this.proyectosService.getProject().subscribe(x => {
      this.proyectos = x
    })
  }

  crearProyecto() {
    const formData = new FormData()
    formData.append("nombre", this.nombre)
    formData.append("descripcion", this.descripcion)
    formData.append("imagenFile", this.fileProyecto)

    this.proyectosService.postProject(formData).subscribe({
      next: res => console.log("creadooo ", res),
      error: err => console.error(err)
    })
  }

  onFileSelected(event: any, tipo: 'proyecto' | 'servicio') {
    const archivo = event.target.files[0];

    if (tipo === 'proyecto') {
      this.fileProyecto = archivo;
    } else if (tipo === 'servicio') {
      this.fileServicio = archivo;
    }
  }

  EditValues(project: any) {
    this.selectedProject = { ...project }
    this.id = project.id
    this.nombreEdit = project.nombre
    this.descripcionEdit = project.descripcion
    this.horasEdit = project.horas
    this.estadoEdit = project.estado
    this.fechaInicioEdit = project.fecha_inicio
    this.fechaFinEdit = project.fecha_fin
    this.fileEdit = null
    // console.log(this.fechaInicioEdit )
    // console.log(this.fechaFinEdit )    
  }

  editarProyecto() {
    const formData = new FormData()

    formData.append("nombre", this.nombreEdit)
    formData.append("descripcion", this.descripcionEdit)
    formData.append("fecha_inicio", this.fechaInicioEdit)
    formData.append("fecha_fin", this.fechaFinEdit)
    formData.append("estado", this.estadoEdit)
    formData.append("horas", this.horasEdit)

    if (this.fileEdit) {
      formData.append("imagenFile", this.fileEdit
      )
    }

    this.proyectosService.editProject(this.id, formData).subscribe({
      next: () => location.reload(),
      error: err => console.error(err)
    })
  }

  DeleteValues(id: any) {
    this.idDelete = id;
  }

  // poner msj
  deleteProject() {
    console.log(this.idDelete)
    this.proyectosService.deleteProject(this.idDelete).subscribe({
      next: () => location.reload(),
      error: err => console.error(err)
    })
  }

  getServicios() {
    this.serviciosService.getServices().subscribe(x => {
      this.servicios = x
    })
  }

  crearServicio() {
    const formData = new FormData()
    formData.append("nombre", this.nombreServicio)
    formData.append("descripcion", this.descServicio)
    // console.log(servicio)
    this.serviciosService.postService(formData).subscribe({
      next: () => location.reload(),
      error: err => console.error(err)
    })
  }

  EditServiceValues(service: any) {
    this.selectedService = { ...service }
    this.idServicio = service.id
    this.nombreServicioEdit = service.nombre
    this.descripcionServicioEdit = service.descripcion
  }

  editarServicio() {
    const formData = new FormData()

    formData.append("nombre", this.nombreServicioEdit)
    formData.append("descripcion", this.descripcionServicioEdit)

    if (this.fileEdit) {
      formData.append("imagenFile", this.fileEdit
      )
    }

    this.serviciosService.editServices(this.idServicio, formData).subscribe({
      next: () => location.reload(),
      error: err => console.error(err)
    })
  }

  DeleteServiceValues(id: any) {
    this.idDeleteService = id;
  }

  // poner msj
  deleteService() {
    console.log(this.idDeleteService)
    this.serviciosService.deleteServices(this.idDeleteService).subscribe({
      next: () => location.reload(),
      error: err => console.error(err)
    })
  }

}