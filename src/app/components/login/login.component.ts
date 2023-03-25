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
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: SocialAuthService,
    private auth: AuthenticationService,
    private router: Router
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
        this.router.navigateByUrl('google-login');
      }
    });
  }

  signIn() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions)
      .then((data) => {
        console.log(data);
      })
      .catch((data) => {
        this.authService.signOut();
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
      console.log(user);
      this.auth.internalLogin(user).subscribe((x) => {
        localStorage.setItem('token', x);
        if (x) {
          this.router.navigateByUrl('home');
        }
      });
    }
  }
  googleLoginOptions = {
    scope: 'profile email',
  };
}
