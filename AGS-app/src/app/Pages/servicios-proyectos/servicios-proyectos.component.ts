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

  showProyects = false;
  showServices = true;

  proyectos: any;
  nombre: any;
  descripcion: any;
  fileProyecto!: File;
  nombreArchivo: string = 'Ningún archivo seleccionado';
  imagenPrevia: string | ArrayBuffer | null = null;

  selectedProject: any;
  id: any
  nombreEdit: any;
  descripcionEdit: any;
  fileEdit!: File;
  horasEdit: any;
  estadoEdit: any;
  fechaInicioEdit: any;
  fechaFinEdit: any;
  fileProyectoEdit: File | null = null;
  imagenPreviaEdit: any = null;
  nombreArchivoEdit: string = 'Imagen actual del proyecto';

  idDelete: any;
  fechaActual: string = "";

  servicios: any;
  nombreServicio: any;
  descServicio: any;

  selectedService: any;
  idServicio: any;
  nombreServicioEdit: any;
  descripcionServicioEdit: any;

  idDeleteService: any;


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

  onFileSelected(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.fileProyecto = archivo;
      this.nombreArchivo = archivo.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPrevia = reader.result;
      };
      reader.readAsDataURL(archivo);

    }
  }

  onFileSelectedEdit(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.fileProyectoEdit = archivo;
      this.nombreArchivoEdit = archivo.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreviaEdit = reader.result; 
      };
      reader.readAsDataURL(archivo);
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
    this.imagenPreviaEdit = project.url; 
    this.fileProyectoEdit = null;        
    this.nombreArchivoEdit = "Imagen actual del proyecto";;
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
    let obj = {
      "nombre": this.nombreServicio,
      "descripcion": this.descServicio
    }

    this.serviciosService.postService(obj).subscribe({
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
    let obj = {
      "nombre": this.nombreServicioEdit,
      "descripcion": this.descripcionServicioEdit
    }

    this.serviciosService.editServices(this.idServicio, obj).subscribe({
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