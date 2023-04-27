import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  user?:IUser;
  constructor(private router:Router, private userService:UserService) {


  }
  goToProfile()
  {
    this.router.navigateByUrl('profile');
  }
  goHome(){
    this.router.navigateByUrl('home');
  }
  goToPeople()
  {
    this.router.navigateByUrl('people');
  }
  goToUsersRecipes()
  {
    this.router.navigateByUrl('users-recipes');
  }
  goToSearch()
  {
    this.router.navigateByUrl('search-page');
  }
  addANewRecipe()
  {
    this.router.navigateByUrl('edit-create-recipe');
  }
}
