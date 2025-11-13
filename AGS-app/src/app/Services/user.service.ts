import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "https://localhost:7198/AGS/users"
  private userId: any

  constructor(private httpClient: HttpClient) { }

  GetUsers() {
    return this.httpClient.get(this.url + "/GetUsers")
  }

  GetUserById(id: any) {
    return this.httpClient.get(`${this.url}/${id}`)
  }

  CreateUser(obj: any) {
    return this.httpClient.post(this.url + "/CreateUser", obj)
  }

  Login(obj: any) {
    return this.httpClient.post(this.url + "/Login", obj)
  }

  EditUser(id: any, obj: any) {
    return this.httpClient.put(`${this.url}/${id}`, obj)
  }

  DeleteUser(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  ChangePass(obj: any, id: any) {
    return this.httpClient.post(`${this.url}/ChangePass/${id}`, obj)
  }

  getUserId() {
    return this.userId
  }

  setUserId(id: any) {
    this.userId = id
  }
}
