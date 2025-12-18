import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private url = environment.apiUrl + "/Project";

  constructor(private httpClient: HttpClient ) { }

  getProject(){
    return this.httpClient.get(this.url)
  }

  getPublicProject(){
    return this.httpClient.get(this.url + "/publicos")
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

  editProjectByHours(id:any,horas:number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.patch(`${this.url}/${id}/horas`, horas, { headers });
  }
  
}
