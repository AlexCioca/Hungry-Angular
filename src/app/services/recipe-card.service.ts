import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipeImages } from '../models/recipe-image';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RecipeCardService {

  endpoint = 'https://localhost:7070/api'
  constructor(private http:HttpClient) { }

  getRecipeCreator(id:number)
  {
    return this.http.get<IUser>(`${this.endpoint}/User/GetUserById/`+id);
  }
  getRecipePhotos(id:number)
  {
    return this.http.get<IRecipeImages[]>(`${this.endpoint}/Recipe/GetImagesForRecipe?id=`+id);
  }
  getRecipeRating(id:number)
  {
    return this.http.get<number>(`${this.endpoint}/Recipe/GetReviewRating?recipeId=`+id);
  }
  getLikedRecipesForUser()
  {
    return this.http.get<number>(`${this.endpoint}/Recipe/GetLikedRecipesForUser`);
  }
  getIfRecipeIsLiked(recipeId:number)
  {
    return this.http.get<boolean>(`${this.endpoint}/UserRecipe/GetIfRecipeIsLiked?recipeId=`+recipeId);
  }
}
