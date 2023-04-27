import { IRecipeSteps } from './../models/recipe-steps';
import { IIngredients } from './../models/ingredient';
import { IRecipeImages } from './../models/recipe-image';
import { IRecipe } from './../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipeReview } from '../models/recipe-review';

@Injectable({
  providedIn: 'root'
})
export class RecipePageService {

  endpoint = 'https://localhost:7070/api'

  constructor(private http:HttpClient) { }

  getRecipeById(id:number){
    return this.http.get<IRecipe>(`${this.endpoint}/Recipe/GetRecipeById/`+id);
  }
  async addPhotoToRecipe(photo:IRecipeImages)
  {
     return this.http.post<IRecipeImages>(`${this.endpoint}/Recipe/AddPhotoForRecipe`,photo);
  }
  getRecipePhotos(id:number)
  {
    return this.http.get<IRecipeImages[]>(`${this.endpoint}/Recipe/GetImagesForRecipe?id=`+id);
  }
  updateRecipe(recipe:IRecipe)
  {
    return this.http.put<IRecipe>(`${this.endpoint}/Recipe/UpdateRecipe`,recipe);
  }

  getRecipeReviews(id:number){
    return this.http.get<IRecipeReview[]>(`${this.endpoint}/RecipeReview/GetReviewForUser?id=`+id);
  }
  getRecipeIngredients(id:number){
    return this.http.get<IIngredients[]>(`${this.endpoint}/Recipe/GetIngredientsForRecipe?id=`+id);
  }
  getRecipeSteps(id:number){
    return this.http.get<IRecipeSteps[]>(`${this.endpoint}/Recipe/GetStepsForRecipe?id=`+id);
  }

  deletePhoto(id:number)
  {
    return this.http.delete<IRecipeImages>(`${this.endpoint}/Recipe/DeletePhotoForRecipe?id=`+id);
  }
  addRecipe(recipe:IRecipe)
  {
    return this.http.post<IRecipe>(`${this.endpoint}/Recipe/AddRecipe`,recipe);
  }
}
