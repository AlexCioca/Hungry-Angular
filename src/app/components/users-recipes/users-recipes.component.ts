import { UserService } from './../../services/user.service';
import { UsersRecipesService } from './../../services/users-recipes.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRecipe } from 'src/app/models/recipe';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-users-recipes',
  templateUrl: './users-recipes.component.html',
  styleUrls: ['./users-recipes.component.css']
})
export class UsersRecipesComponent {

  recipeList:IRecipe[]=[];

  constructor( private router: Router,private userRecipeService:UsersRecipesService,private userService:UserService) {}


  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(data=>{
    this.userRecipeService.getRecipesForUser(data.userId).subscribe(data=>{this.recipeList=data;
    });
  })
  }

  openRecipePage(recipe:any)
  {
    if (recipe) {
      this.router.navigateByUrl('edit-create-recipe/' + recipe?.recipeId);
    } else {
      this.router.navigateByUrl('edit-create-recipe');
    }
  }
}
