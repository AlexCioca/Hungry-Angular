import { IUser } from './../../models/user';
import { RecipeCardService } from './../../services/recipe-card.service';
import { IRecipe } from './../../models/recipe';
import { Component, Input } from '@angular/core';
import { IRecipeImages } from 'src/app/models/recipe-image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card-module',
  templateUrl: './recipe-card-module.component.html',
  styleUrls: ['./recipe-card-module.component.css']
})
export class RecipeCardModuleComponent {

@Input() recipe?:IRecipe;
photos?: IRecipeImages[] = [];
recipeUser:any;
imgCollection: Array<{ image: string; thumbImage?: string; title?: string }> =
[];

constructor(private recipeCardService:RecipeCardService,private router: Router) {
}

ngOnInit(): void {

this.imgCollection.push({
  image:'',
  thumbImage:'',
  title:''
});
this.recipeCardService.getRecipeCreator(this.recipe?.userId!).subscribe(data=>this.recipeUser=data);
this.recipeCardService
.getRecipePhotos(
  this.recipe?.recipeId!
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
openRecipePage(recipe:any)
{
  if (recipe) {
    this.router.navigateByUrl('recipe-page/' + recipe?.recipeId);
  } else {
    this.router.navigateByUrl('recipe-page');
  }
}

}
