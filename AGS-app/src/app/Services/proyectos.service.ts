import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  url = "https://localhost:7198/AGS/Carousel"

  constructor(private httpClient: HttpClient ) { }

  getImages(){
    return this.httpClient.get(this.url + "/GetArchivos")
  }

  postImagen(title:any,sortOrder:any, file:any){
    const params = new HttpParams().set('title',title).set('sortOrder', sortOrder).set('file', file)
    return this.httpClient.post(this.url + "/upload", null, {params})
  }
}
