import { HomeService } from './../../services/home.service';
import { IRecipe } from './../../models/recipe';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recipeList:IRecipe[]=[];

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

    this.homeService.getRecipes().subscribe(data=>{this.recipeList=data;
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
