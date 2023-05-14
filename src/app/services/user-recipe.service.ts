import { IUserRecipe } from './../models/user-recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  endpoint = 'https://localhost:7070/api'

  constructor(private http:HttpClient) { }

  addNewLike(userRecipe:IUserRecipe)
  {
    return this.http.post<IUserRecipe>(`${this.endpoint}/UserRecipe/AddLikeForRecipe`,userRecipe);
  }
  deleteLike(userRecipe:IUserRecipe)
  {
    return this.http.delete<IUserRecipe>(`${this.endpoint}/UserRecipe/DeleteLikeForRecipe`,{body:userRecipe});
  }

  getLikesForRecipe(recipeId:number)
  {
    return this.http.get<number>(`${this.endpoint}/UserRecipe/GetLikesForRecipe?recipeId=`+recipeId);
  }

  addCategoryLike(categoryId : number)
  {
    return this.http.post<IUserRecipe>(`${this.endpoint}/Like/AddCategoryLike?categoryId=`+ categoryId, {});
  }
  deleteCategoryLike(categoryId : number)
  {
    return this.http.delete<IUserRecipe>(`${this.endpoint}/Like/DeleteCategoryLike?categoryId=`+ categoryId, {});
  }

}
