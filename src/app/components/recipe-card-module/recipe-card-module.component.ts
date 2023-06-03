import { RecipePageService } from 'src/app/services/recipe-page.service';
import { ICategory } from './../../models/category';
import { IUserRecipe } from './../../models/user-recipe';
import { IUser } from './../../models/user';
import { RecipeCardService } from './../../services/recipe-card.service';
import { IRecipe } from './../../models/recipe';
import { Component, Input } from '@angular/core';
import { IRecipeImages } from 'src/app/models/recipe-image';
import { Router } from '@angular/router';
import { UserRecipeService } from 'src/app/services/user-recipe.service';

@Component({
  selector: 'app-recipe-card-module',
  templateUrl: './recipe-card-module.component.html',
  styleUrls: ['./recipe-card-module.component.css'],
})
export class RecipeCardModuleComponent {
  @Input() recipe?: IRecipe;
  photos?: IRecipeImages[] = [];
  recipeUser: any;
  imgCollection: Array<{ image: string; thumbImage?: string; title?: string }> =
    [];
  recipeRating: number = 0;
  recipeLikes: number = 0;
  isRecipeLiked: boolean = false;
  category?:ICategory;
  photo:any;

  constructor(
    private recipeCardService: RecipeCardService,
    private router: Router,
    private userRecipeService: UserRecipeService,
    private recipePageService: RecipePageService
  ) {}

  ngOnInit(): void {
    this.imgCollection.push({
      image: '',
      thumbImage: '',
      title: '',
    });
    this.recipeCardService
      .getRecipeCreator(this.recipe?.userId!)
      .subscribe((data) => (this.recipeUser = data));
    this.recipeCardService
      .getRecipePhotos(this.recipe?.recipeId!)
      .subscribe((data) => {
        this.photos = data;
        data.forEach((image) => {
          this.photo=image.image;
          this.imgCollection.push({
            image: image.image,
            thumbImage: image.image,
            title: '',
          });
        });

      });
    this.recipeCardService
      .getRecipeRating(this.recipe?.recipeId!)
      .subscribe((data) => (this.recipeRating = data));
    this.userRecipeService
      .getLikesForRecipe(this.recipe?.recipeId!)
      .subscribe((data) => {
        this.recipeLikes = data;
      });
    this.recipeCardService
      .getIfRecipeIsLiked(this.recipe?.recipeId!)
      .subscribe((data) => {
        this.isRecipeLiked = data;
      });
  }
  openRecipePage(recipe: any) {
    if (recipe) {
      this.router.navigateByUrl('recipe-page/' + recipe?.recipeId);
    } else {
      this.router.navigateByUrl('recipe-page');
    }
  }
  newLike(event: Event) {
    event.stopPropagation();
    let userRecipe:IUserRecipe={
      userRecipeId:0,
      userId:0,
      recipeId:this.recipe?.recipeId!
    }
    this.userRecipeService.addNewLike(userRecipe).subscribe();
    this.isRecipeLiked=!this.isRecipeLiked;
    this.recipeLikes+=1;
  }


  deleteLike(event: Event) {
    event.stopPropagation();
    let userRecipe:IUserRecipe={
      userRecipeId:0,
      userId:0,
      recipeId:this.recipe?.recipeId!
    }
    this.userRecipeService.deleteLike(userRecipe).subscribe();
    this.isRecipeLiked=!this.isRecipeLiked;
    this.recipeLikes-=1;
  }




}
