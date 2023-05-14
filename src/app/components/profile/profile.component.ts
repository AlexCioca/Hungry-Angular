import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LogedUserService } from './../../services/loged-user.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRecipeImages } from 'src/app/models/recipe-image';
import { ImageEncode } from 'src/app/utils/image-encoder';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user?:IUser;

  constructor(private logedUser:LogedUserService,private userService:UserService, public _sanitizer: DomSanitizer,private router:Router) {
  }
  profileForm = new FormGroup({
    username: new FormControl('',),
    firstName: new FormControl('',),
    lastName: new FormControl('',),
    email: new FormControl('',),
  });
  ngOnInit(): void {

    this.userService.getUserByToken().subscribe(data=>{

      this.user=data;
      this.profileForm.controls['firstName'].setValue(data.firstName!);
      this.profileForm.controls['lastName'].setValue(data.lastName!);
      this.profileForm.controls['email'].setValue(data.email!);
      this.profileForm.controls['username'].setValue(data.username!);
    })

  }
  saveChanges(){


    this.user!.username=this.profileForm.controls['username'].value!;
    this.user!.firstName=this.profileForm.controls['firstName'].value!;
    this.user!.lastName=this.profileForm.controls['lastName'].value!;
    this.user!.email=this.profileForm.controls['email'].value!;
    this.userService.updateUser(this.user!).subscribe();

  }
  async upload(event: any) {
    let imageCode = await ImageEncode.fileToByteArray(event.target.files[0]);
    this.user!.photo=imageCode as string;

  }

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");

  }
}
