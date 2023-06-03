import { FormControl } from '@angular/forms';
import { UserFolowerService } from './../../services/user-folower.service';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent {
  items?: Array<IUser> = Array();
  number: number = 0;
  followed?: Array<IUser> = [];
  numberFollowed: number = 0;
  searchResult?: Array<IUser> = [];
  peopleControl = new FormControl('');

  constructor(
    private userService: UserService,
    public _sanitizer: DomSanitizer,
    private userFollowerService: UserFolowerService,
    private router: Router
  ) {
    this.userService.getPeopleForFollow(0).subscribe((users) => {
      if (users) {
        this.items = users;
        this.number += 15;
      }
    });

    this.userService.getFollowers(0).subscribe((users) => {
      if (users) {
        this.followed = users;
        this.numberFollowed += 15;
      }
    });
  }
  onScroll() {
    this.userService.getPeopleForFollow(this.number).subscribe((users) => {
      if (users) {
        for (var i = 0; i < users.length; i++) {
          this.items?.push(users[i]);
        }
        this.number += 15;
      }
    });
  }

  onScrollFollowed() {
    this.userService.getFollowers(this.numberFollowed).subscribe((users) => {
      if (users) {
        for (var i = 0; i < users.length; i++) {
          this.followed?.push(users[i]);
        }
        this.numberFollowed += 15;
      }
    });
  }

  addFolower(id: number) {
    this.userFollowerService.addNewFollow(id).subscribe();
    let user = this.items?.find((x) => x.userId == id);
    this.items?.splice(this.items.indexOf(user!), 1);
    this.followed?.push(user!);
  }

  removeFollow(followedId: number) {
    this.userFollowerService.removeFollowed(followedId).subscribe();
    let follow = this.followed?.find((x) => x.userId == followedId);
    this.followed?.splice(this.followed.indexOf(follow!), 1);
    this.items?.push(follow!);
  }

  searchUser() {
    this.searchResult = [];
    this.userService
      .searchUserByUsername(this.peopleControl.value!)
      .subscribe((data) => {
        data.forEach((element) => {
          this.searchResult?.push(element);
        });
      });
  }

  checkFollow(user: IUser): boolean | undefined {
    let nr = this.followed?.find((x) => x.userId == user.userId);
    if (nr) {
      return true;
    } else return false;
  }

  goToProfile(id:number){
    this.router.navigateByUrl('/users-profile/'+id);
  }
}
