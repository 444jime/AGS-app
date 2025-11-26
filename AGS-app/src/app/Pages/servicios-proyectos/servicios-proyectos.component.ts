import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../Services/proyectos.service';

@Component({
  selector: 'app-servicios-proyectos',
  standalone: false,
  templateUrl: './servicios-proyectos.component.html',
  styleUrl: './servicios-proyectos.component.css'
})
export class ServiciosProyectosComponent implements OnInit{

  // CAMBIAR DESPUES
  showProyects = true;
  showServices = false;

  proyectos:any;
  nombre:any;
  descripcion:any;
  file!:File;
  
  selectedProject:any;
  id:any
  nombreEdit:any;
  descripcionEdit:any;
  fileEdit!:File;
  horasEdit:any;
  estadoEdit:any;
  fechaInicioEdit:any;
  fechaFinEdit:any;
  
  idDelete:any;
  fechaActual: string = "";

  constructor(private proyectosService:ProyectosService) {}

  ngOnInit(): void {
    this.getProyectos()
    const hoy = new Date()
    this.fechaActual = hoy.toLocaleDateString("es-AR")
  }

  show(tipo: 'proyectos' | 'servicios', event: Event) {
    event.preventDefault();
    this.showProyects = tipo === 'proyectos';
    this.showServices = tipo === 'servicios';
  }

  getProyectos(){
    this.proyectosService.getProject().subscribe(x=>{
      this.proyectos = x      
    })
  }

  crearProyecto(){
    const formData = new FormData()
    formData.append("nombre", this.nombre)
    formData.append("descripcion", this.descripcion)
    formData.append("imagenFile", this.file)
    
    this.proyectosService.postProject(formData).subscribe({
      next: res => console.log("creadooo ", res),
      error: err => console.error(err)
    })
  }

  onFileSelected(event:any){
    this.file = event.target.files[0]
    // console.log(this.file)
  }

  EditValues(project:any){
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

  editarProyecto(){
    const formData = new FormData()

    formData.append("nombre", this.nombreEdit)
    formData.append("descripcion",this.descripcionEdit)
    formData.append("fecha_inicio",this.fechaInicioEdit)
    formData.append("fecha_fin",this.fechaFinEdit)
    formData.append("estado",this.estadoEdit)
    formData.append("horas",this.horasEdit)
    
    if (this.fileEdit) {
      formData.append("imagenFile", this.fileEdit
      )
    }
    
    this.proyectosService.editProject(this.id,formData).subscribe({
      next: () =>  location.reload(),
      error: err => console.error(err)      
    })
  }

  DeleteValues(id:any){
    this.idDelete = id;
  }

  // poner msj
  deleteProject(){
    console.log(this.idDelete)
    this.proyectosService.deleteProject(this.idDelete).subscribe({
      next: () =>  location.reload(),
      error: err => console.error(err)
    })
  }

}