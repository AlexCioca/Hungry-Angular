import { IUserFollower } from './../models/user-follower';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFolowerService {

  endpoint = 'https://localhost:7070/api'

  constructor(private http:HttpClient) { }

   addNewFollow(userId:number,followerId:number)
  {

    return this.http.post<IUserFollower>(`${this.endpoint}/UserFollower/AddFolower?userId=`+userId+`&followerId=`+followerId,{});
  }

}
