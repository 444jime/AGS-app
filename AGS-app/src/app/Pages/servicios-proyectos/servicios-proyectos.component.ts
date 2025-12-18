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
  loadingServicios = false;
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
  loadingCrearProyecto: boolean = false;
  esPublico: boolean = false;

  // EDITAR PROYECTO
  selectedProject: any;
  id: any
  nombreEdit: any;
  descripcionEdit: any;
  horasEdit: any;
  estadoEdit: any;
  fechaInicioEdit: any;
  fileProyectoEdit: File | null = null;
  imagenPreviaEdit: any = null;
  nombreArchivoEdit: string = 'Imagen actual del proyecto';
  esPublicoEdit: boolean = false;
  loadingEditProyecto: boolean = false;

  // FINALIZAR PROYECTO
  idDelete: any;
  fechaActual: string = "";
  loadingFinalizar: boolean = false;

  // CREAR SERVICIO
  servicios: any;
  nombreServicio: any;
  descServicio: any;
  loadingCrearServicio: boolean = false;

  // EDITAR SERVICIO
  selectedService: any;
  idServicio: any;
  nombreServicioEdit: any;
  descripcionServicioEdit: any;
  loadingEditService: boolean = false;

  // ELIMINAR SERVICIO
  idDeleteService: any;
  loadingDeleteServicio: boolean = false;


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
    if (this.loadingCrearProyecto) return;
    this.loadingCrearProyecto = true;

    const formData = new FormData()
    formData.append("nombre", this.nombre)
    formData.append("descripcion", this.descripcion)
    formData.append("fecha_inicio", this.fechaInicio)
    formData.append("estado", this.estado)
    formData.append("horas", this.horas)
    formData.append("imagenFile", this.fileProyecto)
    formData.append('es_publico', this.esPublico.toString())

    this.proyectosService.postProject(formData).subscribe({
      next: () => {
        this.getProyectos();
        this.resetFormulario();

        this.loadingCrearProyecto = false;
        this.mostrarExito("El proyecto se ha creado correctamente.");
      },
      error: err => {
        console.error(err);
        this.loadingCrearProyecto = false;
      }
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
    this.nombreArchivoEdit = "Imagen actual del proyecto";
    this.esPublicoEdit = project.es_publico;
  }

  editarProyecto() {
    if (this.loadingEditProyecto) return;
    this.loadingEditProyecto = true;

    const formData = new FormData()
    formData.append("nombre", this.nombreEdit)
    formData.append("descripcion", this.descripcionEdit)
    formData.append("fecha_inicio", this.fechaInicioEdit)
    formData.append("estado", this.estadoEdit)
    formData.append("horas", this.horasEdit)
    formData.append('es_publico', this.esPublicoEdit.toString())

    if (this.fileProyectoEdit) {
      formData.append("imagenFile", this.fileProyectoEdit)
    }

    this.proyectosService.editProject(this.id, formData).subscribe({
      next: () => {
        this.loadingEditProyecto = false;
        this.getProyectos();
        this.fileProyectoEdit = null;

        const btn = document.getElementById('btnCerrarEditarP');
        if (btn) btn.click();

        this.mostrarExito("Los cambios del proyecto fueron guardados.");
      },
      error: err => {
        console.error(err);
        this.loadingEditProyecto = false;
      }
    })
  }

  // FINALIZAR PROYECTO
  DeleteValues(id: any) {
    this.idDelete = id;
  }

  deleteProject() {
    if (this.loadingFinalizar) return;
    this.loadingFinalizar = true;

    this.proyectosService.deleteProject(this.idDelete).subscribe({
      next: () => {
        this.getProyectos();
        this.loadingFinalizar = false;
        const btn = document.getElementById('btnCerrarFinalizarP');
        if (btn) btn.click();

        this.mostrarExito("La fecha de finalizacion fue actualizada correctamente.");
      },
      error: err => {
        console.error(err);
        this.loadingFinalizar = false;
      }
    })
  }

  // SERVICIOS
  getServicios() {
    this.loadingServicios = true;
    this.serviciosService.getServices().subscribe(x => {
      this.servicios = x
      this.loadingServicios = false;
    })
  }

  // FORMULARIO
  resetFormularioServicios() {
    this.nombreServicio = '';
    this.descServicio = '';
  }

  // CREAR SERVICIO
  crearServicio() {
    if (this.loadingCrearServicio) return;
    this.loadingCrearServicio = true;

    let obj = {
      "nombre": this.nombreServicio,
      "descripcion": this.descServicio
    }

    this.serviciosService.postService(obj).subscribe({
      next: () => {
        this.getServicios();
        this.resetFormularioServicios();

        this.loadingCrearServicio = false;
        this.mostrarExito("El servicio se ha creado correctamente.");
      },
      error: err => {
        console.error(err);
        this.loadingCrearServicio = false;
      }
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
    if (this.loadingEditService) return;
    this.loadingEditService = true;

    let obj = {
      "nombre": this.nombreServicioEdit,
      "descripcion": this.descripcionServicioEdit
    }

    this.serviciosService.editServices(this.idServicio, obj).subscribe({
      next: () => {
        this.loadingEditService = false;
        this.getServicios();
        const btn = document.getElementById('btnCerrarEditarS');
        if (btn) btn.click();

        this.mostrarExito("Los cambios del servicio fueron guardados.");
      },
      error: err => {
        console.error(err);
        this.loadingEditService = false;
      }
    })
  }

  // ELIMINAR SERVICIO
  DeleteServiceValues(id: any) {
    this.idDeleteService = id;
  }

  deleteService() {
    if (this.loadingDeleteServicio) return;
    this.loadingDeleteServicio = true;

    this.serviciosService.deleteServices(this.idDeleteService).subscribe({
      next: () => {
        this.getServicios();
        this.loadingDeleteServicio = false;
        const btn = document.getElementById('btnCerrarEliminarS');
        if (btn) btn.click();

        this.mostrarExito("El servicio fue eliminado exitosamente.");
      },
      error: err => {
        console.error(err);
        this.loadingDeleteServicio = false;
      }
    })
  }

}