import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  url = "https://localhost:7198/AGS/Contacto/enviar"

  constructor(private httpClient: HttpClient) { }

  PostCorreo(obj:any) {
    return this.httpClient.post(this.url,obj)
  }
}
