import { IRecipe } from './../../models/recipe';
import { RecipePageService } from 'src/app/services/recipe-page.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-surprise-recipes',
  templateUrl: './surprise-recipes.component.html',
  styleUrls: ['./surprise-recipes.component.css']
})
export class SurpriseRecipesComponent {

  mostLikedRecipes?:IRecipe[];
  recomandedRecipes?:IRecipe[];
  topRatedRecipes?:IRecipe[];
  constructor(private recipePageService:RecipePageService) {}

  ngOnInit(): void {
    this.recipePageService.getMostLikedRecipes().subscribe(data => this.mostLikedRecipes=data);
    this.recipePageService.getRecomendedRecipes().subscribe(data => this.recomandedRecipes=data);
    this.recipePageService.getTopRatedRecipes().subscribe(data => this.topRatedRecipes=data);
  }
}
