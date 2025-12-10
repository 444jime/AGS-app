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

  // TODO
  showProyects = false;
  showServices = true;
  proyectos: any;

  mensajeExito: boolean = false;
  textoMensaje: string = "";
  
  // CREAR PROYECTO
  nombre: any;
  descripcion: any;
  fechaInicio: any;
  estado: any;
  horas: any;
  fileProyecto!: File;
  nombreArchivo: string = 'Ningún archivo seleccionado';
  imagenPrevia: string | ArrayBuffer | null = null;

  // EDITAR PROYECTO
  selectedProject: any;
  id: any
  nombreEdit: any;
  descripcionEdit: any;
  fileEdit!: File;
  horasEdit: any;
  estadoEdit: any;
  fechaInicioEdit: any;
  fechaFinEdit: any; //LA TENGO Q SACAR
  fileProyectoEdit: File | null = null;
  imagenPreviaEdit: any = null;
  nombreArchivoEdit: string = 'Imagen actual del proyecto';

  // FINALIZAR PROYECTO
  idDelete: any;
  fechaActual: string = "";

  // CREAR SERVICIO
  servicios: any;
  nombreServicio: any;
  descServicio: any;

  // EDITAR SERVICIO
  selectedService: any;
  idServicio: any;
  nombreServicioEdit: any;
  descripcionServicioEdit: any;

  // ELIMINAR SERVICIO
  idDeleteService: any;


  constructor(
    private proyectosService: ProyectosService, 
    private serviciosService: ServiciosEmpresaService) { }

  ngOnInit(): void {
    this.getProyectos()
    const hoy = new Date()
    this.fechaActual = hoy.toLocaleDateString("es-AR")
    this.getServicios()
  }

  // NAVBAR
  show(tipo: 'proyectos' | 'servicios', event: Event) {
    event.preventDefault();
    this.showProyects = tipo === 'proyectos';
    this.showServices = tipo === 'servicios';
  }

  // MENSAJE EXITO
  mostrarExito(mensaje: string) {
    this.textoMensaje = mensaje;
    this.mensajeExito = true;

    setTimeout(() => {
      this.mensajeExito = false;
    }, 3000);
  }

  // PROYECTOS
  getProyectos() {
    this.proyectosService.getProject().subscribe(x => {
      this.proyectos = x
    })
  }

  // CREAR PROYECTO
  crearProyecto() {
    const formData = new FormData()
    formData.append("nombre", this.nombre)
    formData.append("descripcion", this.descripcion)
    formData.append("fecha_inicio", this.fechaInicio)
    formData.append("estado", this.estado)
    formData.append("horas", this.horas)
    formData.append("imagenFile", this.fileProyecto)

    this.proyectosService.postProject(formData).subscribe({
      next: () => {
        this.getProyectos();
        this.resetFormulario();

        this.mostrarExito("El proyecto se ha creado correctamente.");
      },
      error: err => console.error(err)
    })
  }

  // FORMULARIO
  resetFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.fechaInicio = '';
    this.estado = undefined;
    this.horas = '';
    this.fileProyecto = null;
    this.imagenPrevia = null;
    this.nombreArchivo = 'Ningún archivo seleccionado';
  }

  // IMAGEN
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

  // EDITAR IMAGEN
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

  // EDITAR
  EditValues(project: any) {
    this.selectedProject = { ...project }
    this.id = project.id
    this.nombreEdit = project.nombre
    this.descripcionEdit = project.descripcion
    this.horasEdit = project.horas
    this.estadoEdit = project.estado
    this.fechaInicioEdit = project.fecha_inicio
    this.imagenPreviaEdit = project.url;
    this.fileProyectoEdit = null;
    this.nombreArchivoEdit = "Imagen actual del proyecto";;
  }

  editarProyecto() {
    const formData = new FormData()

    formData.append("nombre", this.nombreEdit)
    formData.append("descripcion", this.descripcionEdit)
    formData.append("fecha_inicio", this.fechaInicioEdit)
    formData.append("estado", this.estadoEdit)
    formData.append("horas", this.horasEdit)

    if (this.fileEdit) {
      formData.append("imagenFile", this.fileEdit
      )
    }

    this.proyectosService.editProject(this.id, formData).subscribe({
      next: () => {
        this.getProyectos();
        const btn = document.getElementById('btnCerrarEditarP');
        if (btn) btn.click();

        this.mostrarExito("Los cambios del proyecto fueron guardados.");
      },
      error: err => console.error(err)
    })
  }

  // FINALIZAR PROYECTO
  DeleteValues(id: any) {
    this.idDelete = id;
  }

  deleteProject() {
    this.proyectosService.deleteProject(this.idDelete).subscribe({
      next: () => {
        this.getProyectos();
        const btn = document.getElementById('btnCerrarFinalizarP');
        if (btn) btn.click();

        this.mostrarExito("La fecha de finalizacion fue actualizada correctamente.");
      },
      error: err => console.error(err)
    })
  }

  // SERVICIOS
  getServicios() {
    this.serviciosService.getServices().subscribe(x => {
      this.servicios = x
    })
  }

  // FORMULARIO
  resetFormularioServicios() {
    this.nombreServicio = '';
    this.descServicio = '';
  }

  // CREAR SERVICIO
  crearServicio() {
    let obj = {
      "nombre": this.nombreServicio,
      "descripcion": this.descServicio
    }

    this.serviciosService.postService(obj).subscribe({
      next: () => {
        this.getServicios();
        this.resetFormularioServicios();

        this.mostrarExito("El servicio se ha creado correctamente.");
      },
      error: err => console.error(err)
    })
  }

  // EDITAR SERVICIO
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
      next: () => {
        this.getServicios();
        const btn = document.getElementById('btnCerrarEditarS');
        if (btn) btn.click();

        this.mostrarExito("Los cambios del servicio fueron guardados.");
      },
      error: err => console.error(err)
    })
  }

  // ELIMINAR SERVICIO
  DeleteServiceValues(id: any) {
    this.idDeleteService = id;
  }

  deleteService() {
    this.serviciosService.deleteServices(this.idDeleteService).subscribe({
      next: () => {
        this.getServicios();
        const btn = document.getElementById('btnCerrarEliminarS');
        if (btn) btn.click();

        this.mostrarExito("El servicio fue eliminado exitosamente.");
      },
      error: err => console.error(err)
    })
  }

}