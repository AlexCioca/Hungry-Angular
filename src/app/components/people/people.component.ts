import { UserFolowerService } from './../../services/user-folower.service';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent {
  items?: Array<IUser>=Array();
  number:number=0;
  constructor(private userService: UserService,public _sanitizer: DomSanitizer, private userFollowerService:UserFolowerService) {
    this.userService
    .getUserByToken(localStorage.getItem('token')!)
    .subscribe((data) => {
      this.userService.getPeopleForFollow(0, data.userId).subscribe(users=>
        {
          this.items=users;
          this.number+=15;
        });
    });
  }
  onScroll() {
    this.userService
    .getUserByToken(localStorage.getItem('token')!)
    .subscribe((data) => {
      this.userService.getPeopleForFollow(this.number, data.userId).subscribe(users=>
        {
          for(var i = 0; i<users.length;i++)
          {
            this.items?.push(users[i]);
          }
          this.number+=15;
        });
    });


  }

  addFolower(id:number)
  {

    this.userService
    .getUserByToken(localStorage.getItem('token')!)
    .subscribe((data) => {
      this.userFollowerService.addNewFollow(id,data.userId).subscribe();
      let user=this.items?.find(x=>x.userId==id);
      this.items?.splice(this.items.indexOf(user!),1);
    });
  }

}
