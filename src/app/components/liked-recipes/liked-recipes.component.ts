import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRecipe } from 'src/app/models/recipe';
import { HomeService } from 'src/app/services/home.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liked-recipes',
  templateUrl: './liked-recipes.component.html',
  styleUrls: ['./liked-recipes.component.css']
})
export class LikedRecipesComponent {


  recipeList:IRecipe[]=[];
  number:number=0;

  constructor(private jwtHelper: JwtHelperService, private router: Router,private homeService:HomeService) {}

  isUserAuthenticated() {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  public logOut = () => {
    localStorage.removeItem("token");
  }

  ngOnInit(): void {

    this.homeService.getLikedRecipes().subscribe(data=> {
      this.recipeList=data;
    })



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
