import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosEmpresaService {
  private url = environment.apiUrl + "/Servicio";  

  constructor(private httpClient: HttpClient) { }

  getServices() {
    return this.httpClient.get(this.url)
  }

  getServicesId(id:any) {
    return this.httpClient.get(`${this.url}/${id}`)
  }

  postService(obj:any) {
    return this.httpClient.post(this.url, obj)
  }

  editServices(id:any,obj:any){
    return this.httpClient.patch(`${this.url}/${id}`,obj)
  }

  deleteServices(id:any){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
