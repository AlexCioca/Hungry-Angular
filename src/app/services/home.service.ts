import { IRecipe } from './../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  endpoint = 'https://localhost:7070/api'
  constructor(private http:HttpClient) { }

  getRecipes()
  {
    return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetAllRecipes`);
  }
  getFollowedRecipes( number:number)
  {
    return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetFollowedRecipes?number=`+number);
  }
  getLikedRecipes(){
    return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetLikedRecipesForUser`);
  }


}
