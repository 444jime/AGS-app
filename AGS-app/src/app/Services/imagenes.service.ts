import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private url = environment.apiUrl + "/Carousel";

  constructor(private httpClient: HttpClient ) { }

  getImages(){
    return this.httpClient.get(this.url)
  }

  postImage(title:any,sortOrder:any, file:any){
    const params = new HttpParams().set('title',title).set('sortOrder', sortOrder).set('file', file)
    return this.httpClient.post(this.url + "/upload", null, {params})
  }
}
