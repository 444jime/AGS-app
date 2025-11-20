import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  url = "https://localhost:7198/AGS/Project"

  constructor(private httpClient: HttpClient ) { }

  getProject(){
    return this.httpClient.get(this.url)
  }

  getProjectId(id:any){
    return this.httpClient.get(`${this.url}/${id}`)
  }

  postProject(obj:any){
    return this.httpClient.post(this.url, obj)
  }

  editProject(id:any,obj:any){
    return this.httpClient.patch(`${this.url}/${id}`,obj)
  }

  deleteProject(id:any){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
  
}
