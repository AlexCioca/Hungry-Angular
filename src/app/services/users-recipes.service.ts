import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class UsersRecipesService {

  endpoint = 'https://localhost:7070/api'
  constructor(private http:HttpClient) { }

  getRecipesForUser(id:number)
  {
    return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetAllRecipesForCurrentUser?userId=`+id);
  }
}
