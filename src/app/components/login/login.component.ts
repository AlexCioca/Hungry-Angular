import { LogedUserService } from './../../services/loged-user.service';
import { InternalLogin } from './../../models/internal-auth-dto';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExternalAuthDto } from 'src/app/models/auth-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user?: SocialUser;
  loggedIn?: boolean;
  currentUser?: ExternalAuthDto = {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: SocialAuthService,
    private auth: AuthenticationService,
    private router: Router,
    public logedUser:LogedUserService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.user) {
        this.currentUser!.email = this.user.email;
        this.currentUser!.id = this.user.id;
        this.currentUser!.username = this.user.name;
        this.currentUser!.firstName = this.user.firstName;
        this.currentUser!.lastName = this.user.lastName;
        this.auth.login(this.currentUser!).subscribe((x) => {
          localStorage.setItem('token', x);
        });
        this.router.navigateByUrl('home');
      }
    });
  }

  signIn() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions)
      .then((data) => {
        if (data) {
          this.router.navigateByUrl('home');
        }
      })
      .catch((data) => {

      });

  }
  signUp() {
    this.router.navigateByUrl('sign-up');
  }

  internalLogin() {
    let user: InternalLogin = {
      email: this.profileForm.get('email')?.value!,
      password: this.profileForm.get('password')?.value!,
    };

    if (user) {
      this.logedUser.user=user.email;

      this.auth.internalLogin(user).subscribe({
        next:(data)=>
        {
          localStorage.setItem('token', data);


          if (data) {
            this.router.navigateByUrl('home');
          }
        },
        error:(error)=>{alert("User not found");}
      })



    }

  }
  googleLoginOptions = {
    scope: 'profile email',
  };
}
