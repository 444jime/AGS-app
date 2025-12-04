import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  url = "https://localhost:7198/AGS/Evento"

  constructor(private httpClient: HttpClient) { }

  GetEventos() {
    return this.httpClient.get(this.url)
  }

  PostEvento(obj:any){
    return this.httpClient.post(this.url,obj)
  }

  EditEvento(id:any,obj:any){
    return this.httpClient.patch(`${this.url}/${id}`,obj)
  }  

  DeleteEventos(id:any){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
