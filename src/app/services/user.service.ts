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

 getUserByToken()
 {
  return this.http.get<IUser>(`${this.endpoint}/User/GetUserByToken`);
 }

 getUserRole()
 {
  return this.http.get(`${this.endpoint}/User/GetUserRole`,{ responseType: 'text' });
 }

 getUserByUsername(username:string)
 {
  return this.http.get<IUser>(`${this.endpoint}/User/GetUserByUsername/`+username);
 }
 updateUser(user:IUser)
 {
  return this.http.put<IUser>(`${this.endpoint}/User/UpdateUser`,user);
 }
 getPeopleForFollow(number:number)
 {

  return this.http.get<IUser[]>(`${this.endpoint}/User/GetNewUsers?number=`+ number);
 }
 getFollowers(number:number)
 {

  return this.http.get<IUser[]>(`${this.endpoint}/User/GetFollowed?number=`+ number);
 }

 searchUserByUsername(username:string)
 {
  return this.http.get<IUser[]>(`${this.endpoint}/User/SearchPeopleByUsername?username=`+ username);
 }
}
