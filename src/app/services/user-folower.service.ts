import { IUserFollower } from './../models/user-follower';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFolowerService {

  endpoint = 'https://localhost:7070/api'

  constructor(private http:HttpClient) { }

   addNewFollow(followerId:number)
  {

    return this.http.post<IUserFollower>(`${this.endpoint}/UserFollower/AddFolower?followerId=`+followerId,{});
  }
  removeFollowed(followedId:number)
  {
    return this.http.delete<IUserFollower>(`${this.endpoint}/UserFollower/RemoveFollowed?followedId=`+followedId,{});
  }
}
