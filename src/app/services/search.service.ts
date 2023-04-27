import { ICategory } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint = 'https://localhost:7070/api'
  constructor(private http:HttpClient) { }

  getRecipes()
  {
    return this.http.get<string[]>(`${this.endpoint}/Recipe/GetAllRecipesNames`);
  }
  getCategories()
  {
    return this.http.get<ICategory[]>(`${this.endpoint}/Category/GetAllCategories`);
  }
  getSearchResult(categoryId?:number,search?:string)
  {
    if(categoryId==undefined&&search==undefined)
    {
      return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetRecipeBasedOnCategory?categoryId=&recipeName=`);
    }
    if(categoryId==undefined)
    {
      return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetRecipeBasedOnCategory?categoryId=&recipeName=`+search);
    }
    if(search==undefined)
    {
      return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetRecipeBasedOnCategory?categoryId=`+ categoryId+`&recipeName=`);
    }
    return this.http.get<IRecipe[]>(`${this.endpoint}/Recipe/GetRecipeBasedOnCategory?categoryId=`+ categoryId+`&recipeName=`+search);
  }
}
