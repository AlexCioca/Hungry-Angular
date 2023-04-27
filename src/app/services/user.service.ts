import { IUser } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'https://localhost:7070/api';

  constructor(private http:HttpClient) { }

 getUserById(id:number){

  return this.http.get<IUser>(`${this.endpoint}/User/GetUserById/`+id);
 }

 getUserByToken(token:string)
 {
  return this.http.get<IUser>(`${this.endpoint}/User/GetUserByToken/`+token);
 }

 getUserByUsername(username:string)
 {
  return this.http.get<IUser>(`${this.endpoint}/User/GetUserByUsername/`+username);
 }
 updateUser(user:IUser)
 {
  return this.http.put<IUser>(`${this.endpoint}/User/UpdateUser`,user);
 }
 getPeopleForFollow(number:number,userId:number)
 {

  return this.http.get<IUser[]>(`${this.endpoint}/User/GetNewUsers?number=`+number +`&userId=`+userId);
 }

}
