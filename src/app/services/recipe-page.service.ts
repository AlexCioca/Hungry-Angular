import { Observable } from 'rxjs';
import { IRecipeSteps } from './../models/recipe-steps';
import { IIngredients } from './../models/ingredient';
import { IRecipeImages } from './../models/recipe-image';
import { IRecipe } from './../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipeReview } from '../models/recipe-review';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class RecipePageService {
  endpoint = 'https://localhost:7070/api';

  constructor(private http: HttpClient) {}

  getRecipeById(id: number) {
    return this.http.get<IRecipe>(
      `${this.endpoint}/Recipe/GetRecipeById/` + id
    );
  }
   addPhotoToRecipe(photo: IRecipeImages) {
    return this.http.post<IRecipeImages>(
      `${this.endpoint}/Recipe/AddPhotoForRecipe`,
      photo
    );
  }
  getRecipePhotos(id: number): Observable<IRecipeImages[]> {
    return this.http.get<IRecipeImages[]>(
      `${this.endpoint}/Recipe/GetImagesForRecipe?id=` + id
    );
  }
  updateRecipe(recipe: IRecipe) {
    return this.http.put<IRecipe>(
      `${this.endpoint}/Recipe/UpdateRecipe`,
      recipe
    );
  }

  getRecipeReviews(id: number) {
    return this.http.get<IRecipeReview[]>(
      `${this.endpoint}/RecipeReview/GetReviewForUser?id=` + id
    );
  }
  getRecipeIngredients(id: number) {
    return this.http.get<IIngredients[]>(
      `${this.endpoint}/Recipe/GetIngredientsForRecipe?id=` + id
    );
  }
  getRecipeSteps(id: number) {
    return this.http.get<IRecipeSteps[]>(
      `${this.endpoint}/Recipe/GetStepsForRecipe?id=` + id
    );
  }
  deletePhoto(id: number) {
    return this.http.delete<IRecipeImages>(
      `${this.endpoint}/Recipe/DeletePhotoForRecipe?id=` + id
    );
  }
  addRecipe(recipe: IRecipe) {
    return this.http.post<IRecipe>(`${this.endpoint}/Recipe/AddRecipe`, recipe);
  }
  addIngredient(ingredient: IIngredients) {
    return this.http.post<IIngredients>(
      `${this.endpoint}/Recipe/AddIngredient`,
      ingredient
    );
  }

  addReview(review: IRecipeReview) {
    return this.http.post<IRecipeReview>(
      `${this.endpoint}/Recipe/AddReview`,
      review
    );
  }
  addStep(step: IRecipeSteps) {
    return this.http.post<IRecipeSteps>(
      `${this.endpoint}/Recipe/AddStep`,
      step
    );
  }
  deleteIngredient(ingredient: IIngredients) {
    return this.http.delete<IIngredients>(
      `${this.endpoint}/Recipe/DeleteIngredient`,
      { body: ingredient }
    );
  }
  deleteStep(step: IRecipeSteps) {
    return this.http.delete<IRecipeSteps>(
      `${this.endpoint}/Recipe/DeleteStep`,
      { body: step }
    );
  }
  deleteReview(review: IRecipeReview) {
    return this.http.delete<IRecipeReview>(
      `${this.endpoint}/Recipe/DeleteReview`,
      { body: review }
    );
  }
  getRecipeCategory(recipeId: number) {
    return this.http.get<ICategory>(
      `${this.endpoint}/Recipe/GetRecipeCategory?recipeId=` + recipeId
    );
  }
  updateRecipeCategory(recipeId: number, categoryId: number) {
    return this.http.put<ICategory>(
      `${this.endpoint}/RecipeCategory/UpdateRecipeCategory?recipeId=` +
        recipeId +
        `&categoryId=` +
        categoryId,
      {}
    );
  }
  addRecipeCategory(recipeId: number, categoryId: number) {
    return this.http.post<ICategory>(
      `${this.endpoint}/RecipeCategory/AddRecipeCategory?recipeId=` +
        recipeId +
        `&categoryId=` +
        categoryId,
      {}
    );
  }
  getMostLikedRecipes() {
    return this.http.get<IRecipe[]>(
      `${this.endpoint}/Recipe/GetMostLikedRecipes`
    );
  }
  getRecomendedRecipes() {
    return this.http.get<IRecipe[]>(
      `${this.endpoint}/Recipe/GetRecomandedRecipes`
    );
  }
  getTopRatedRecipes() {
    return this.http.get<IRecipe[]>(
      `${this.endpoint}/Recipe/GetTopRatedRecipes`
    );
  }
  updateMainPhotoForRecipe(recipeId:number,image:string)
  {

    return this.http.put<any>(
      `${this.endpoint}/Recipe/ChangeMainPhotoForARecipe`,
     {RecipeId:recipeId,Photo:image}
    );
  }
}
