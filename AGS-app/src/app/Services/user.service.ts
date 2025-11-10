import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "https://localhost:7198/AGS/users"
  private userId:any

  constructor(private httpClient: HttpClient) { }

  CreateUser(obj:any){
    return this.httpClient.post(this.url + "/CreateUser", obj)
  }

  Login(obj:any){
    return this.httpClient.post(this.url + "/Login", obj)
  }

  GetUsers(){
    return this.httpClient.get(this.url + "/GetUsers")
  }

  // GetUserById(id:any){
  //   return this.httpClient.get(this.url + "/GetUserById?id=" + id)
  // }

  // ChangePass(pass:any,id:any){
  //   const params = new HttpParams().set('pass',pass).set("id",id)
  //   return this.httpClient.put(this.url + "/ChangePass", null, {params})
  // }

  getUserId(){
    return this.userId
  }

  setUserId(id:any){
    this.userId = id
  }
}
