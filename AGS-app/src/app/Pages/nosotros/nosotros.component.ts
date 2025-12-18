import { Component } from '@angular/core';
import { ContactoService } from '../../Services/contacto.service';

@Component({
  selector: 'app-nosotros',
  standalone: false,
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

  // FORMULARIO CONTACTO
  nombreCompleto: any;
  email: any;
  telefono: any;
  tipoProyecto: any;
  mensaje: any;
  loading: boolean = false;

  // CARTELITO
  mensajeExito: boolean = false;
  textoMensaje: string = "";


  constructor(private contactoService: ContactoService) { }

  // FORMULARIO
  resetFormulario() {
    this.nombreCompleto = '';
    this.email = '';
    this.telefono = '';
    this.tipoProyecto = '';
    this.mensaje = '';
  }

  // MENSAJE EXITO
  mostrarExito(mensaje: string) {
    this.textoMensaje = mensaje;
    this.mensajeExito = true;

    setTimeout(() => {
      this.mensajeExito = false;
    }, 3000);
  }

  // ENVIAR FORMULARIO CONTACTO
  enviarForm() {
    if (this.loading) return;
    this.loading = true;

    let obj = {
      nombreCompleto: this.nombreCompleto,
      email: this.email,
      telefono: this.telefono,
      tipoProyecto: this.tipoProyecto,
      mensaje: this.mensaje
    }

    setTimeout(() => {
      this.loading = false;
      this.resetFormulario();
      this.mostrarExito("El formulario fue enviado al correo de la empresa.");

    }, 2000);
  }

}
