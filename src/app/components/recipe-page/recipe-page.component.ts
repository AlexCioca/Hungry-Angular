import { IRecipeReview } from '../../models/recipe-review';
import { IIngredients } from './../../models/ingredient';
import { IUser } from './../../models/user';
import { UserService } from './../../services/user.service';
import { ChangeRecipePhotosComponent } from './../change-recipe-photos/change-recipe-photos.component';
import { IRecipeImages } from './../../models/recipe-image';
import { RecipePageService } from './../../services/recipe-page.service';
import { RecipeCardService } from './../../services/recipe-card.service';
import { IRecipe } from './../../models/recipe';
import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageEncode } from 'src/app/utils/image-encoder';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IRecipeSteps } from 'src/app/models/recipe-steps';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css'],
})
export class RecipePageComponent {
  recipe?: IRecipe;
  photos?: IRecipeImages[] = [];
  imgCollection: Array<{ image: string; thumbImage?: string; title?: string }> =
    [];
  owner?: IUser;
  ingredients: IIngredients[] = [];
  steps: IRecipeSteps[] = [];
  reviews: IRecipeReview[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private recipePageService: RecipePageService,
    public _sanitizer: DomSanitizer,
    private userService: UserService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
		config.readonly = true;
    if (parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)) {
      recipePageService
        .getRecipeById(
          parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
        )
        .subscribe((x) => {
          this.recipe = x;
          this.userService
            .getUserById(this.recipe?.userId!)
            .subscribe((data) => {
              this.owner = data;

            });
          this.recipePageService
            .getRecipeIngredients(this.recipe?.recipeId!)
            .subscribe((data) => (this.ingredients = data));
          this.recipePageService
            .getRecipeSteps(this.recipe?.recipeId!)
            .subscribe((data) => (this.steps = data));
          this.recipePageService
            .getRecipeReviews(this.recipe?.recipeId!)
            .subscribe((data) => (this.reviews = data));
        });
        this.recipePageService
        .getRecipePhotos(
          parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
        )
        .subscribe((data) => {
          this.photos = data;
          data.forEach((image) => {
            this.imgCollection.push({
              image: image.image,
              thumbImage: image.image,
              title: '',
            });
          });
        });
     
    }
  }
  ngOnInit(): void {

  }
}
