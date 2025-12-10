import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private url = environment.apiUrl + "/Contacto/enviar";

  constructor(private httpClient: HttpClient) { }

  PostCorreo(obj:any) {
    return this.httpClient.post(this.url,obj)
  }
}
