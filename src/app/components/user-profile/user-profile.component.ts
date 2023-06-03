import { IRecipe } from './../../models/recipe';
import { UserFolowerService } from './../../services/user-folower.service';
import { IUser } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersRecipesService } from 'src/app/services/users-recipes.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user?: IUser;
  followersNumber?: number;
  followingNumber?: number;
  follows?: boolean;
  recipes?: IRecipe[];
  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    public _sanitizer: DomSanitizer,
    private userFollowerService: UserFolowerService,
    private userRecipeService: UsersRecipesService
  ) {
    this.userService
      .getUserById(parseInt(this.activatedRouter.snapshot.paramMap.get('id')!))
      .subscribe((data) => (this.user = data));
    this.userFollowerService
      .getFollowersNumber(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => (this.followersNumber = data));
    this.userFollowerService
      .getFollowingNumber(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => {
        this.followingNumber = data;
        console.log(data);
      });
    this.checkFollow();
    this.userRecipeService
      .getRecipesForUser(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => (this.recipes = data));
  }

  checkFollow() {
    this.userFollowerService
      .checkIfUserFollows(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => {
        this.follows = data;
        console.log(data);
      });
  }
  addFolower() {
    this.userFollowerService
      .addNewFollow(parseInt(this.activatedRouter.snapshot.paramMap.get('id')!))
      .subscribe();
    this.follows = true;
  }

  removeFollow() {
    this.userFollowerService
      .removeFollowed(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe();
    this.follows = false;
  }
}
