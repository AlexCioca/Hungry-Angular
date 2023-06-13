import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageNotificationsComponent } from '../message-notifications/message-notifications.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  user?: IUser;
  role: string = '';
  constructor(
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialog
  ) {
    this.userService.getUserRole().subscribe((data) => {
      this.role = data;
      
    });
  }

  goToAdmin() {
    this.router.navigateByUrl('admin-panel');
  }
  goToProfile() {
    this.router.navigateByUrl('profile');
  }
  goHome() {
    this.router.navigateByUrl('home');
  }
  goToPeople() {
    this.router.navigateByUrl('people');
  }
  goToUsersRecipes() {
    this.router.navigateByUrl('users-recipes');
  }
  goToSearch() {
    this.router.navigateByUrl('search-page');
  }
  addANewRecipe() {
    this.router.navigateByUrl('edit-create-recipe');
  }
  goToLiked() {
    this.router.navigateByUrl('liked-recipes');
  }
  goToSurprize() {
    this.router.navigateByUrl('surprize-recipes');
  }

  openNotifications() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    dialogConfig.data = {};

    const dialog = this.dialogRef.open(
      MessageNotificationsComponent,
      dialogConfig
    );

    dialog.afterClosed().subscribe((data) => {});
  }
}
