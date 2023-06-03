import { ICategory } from './../../models/category';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ImageEncode } from 'src/app/utils/image-encoder';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IRecipeSteps } from 'src/app/models/recipe-steps';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { NgOptimizedImage } from '@angular/common'

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
  userReview: any[] = [];
  currentUser?:IUser;
  category?:ICategory;

  constructor(
    private activatedRouter: ActivatedRoute,
    private recipePageService: RecipePageService,
    public _sanitizer: DomSanitizer,
    private userService: UserService,
    config: NgbRatingConfig,
    public dialogRef:MatDialog,
    private router:Router
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
            .subscribe((data) => {
              this.reviews = data;
              data.forEach((element) => {
                this.userService
                  .getUserById(element.userId)
                  .subscribe((data) => {
                    this.userReview.push(Object.assign(element, data));

                  });
              });
            });
        });
      this.recipePageService
        .getRecipePhotos(
          parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
        )
        .subscribe((data) => {
          this.photos = data;
          console.log(this.photos)
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

    this.userService.getUserByToken().subscribe(data=>this.currentUser=data)
    this.recipePageService
    .getRecipeCategory(parseInt(this.activatedRouter.snapshot.paramMap.get('id')!))
    .subscribe((data) => {
      this.category = data;
      console.log(data);
    });

  }

  addComment()
  {
    let recipeId = parseInt(this.activatedRouter.snapshot.paramMap.get('id')!);
    const commentDialogConfig = new MatDialogConfig();

    commentDialogConfig.autoFocus = true;
    commentDialogConfig.width = '50%';
    commentDialogConfig.height = '50%';
    commentDialogConfig.data = {
      recipeId
    };
    const dialog = this.dialogRef.open(
      AddCommentComponent,
      commentDialogConfig
    );

    dialog.afterClosed().subscribe((data) => {
     this.userReview.push(data.data);
    });
  }
  deleteComment(review:IRecipeReview)
  {
    this.recipePageService.deleteReview(review).subscribe();
    this.userReview.splice(this.reviews.indexOf(review),1);

  }
  goToUser()
  {
    this.router.navigateByUrl('/users-profile/'+this.recipe?.userId);
  }
  goToUserFromComment(id:number)
  {
    this.router.navigateByUrl('/users-profile/'+id);
  }
}
