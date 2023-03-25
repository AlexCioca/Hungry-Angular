import { ExternalAuthDto } from './models/auth-dto';
import { AuthenticationService } from './services/authentication.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // user?: SocialUser;
  // loggedIn?: boolean;
  // currentUser?: ExternalAuthDto = {
  //   id: '',
  //   username: '',
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  // };
  // constructor(
  //   private authService: SocialAuthService,
  //   private auth: AuthenticationService
  // ) {}

  /**
   *
   */
  constructor(private router: Router) {}

  // ngOnInit() {
  //   this.authService.authState.subscribe(async (user) => {
  //     this.user = user;
  //     this.loggedIn = user != null;
  //     if (this.user) {
  //       this.currentUser!.email = this.user.email;
  //       this.currentUser!.id = this.user.id;
  //       this.currentUser!.username = this.user.name;
  //       this.currentUser!.firstName = this.user.firstName;
  //       this.currentUser!.lastName = this.user.lastName;
  //     }
  //     this.auth
  //       .login(this.currentUser!)
  //       .subscribe((x) => localStorage.setItem('token', x));
  //   });
  // }
  loginButton(): void {
    // this.authService.authState.subscribe(async (user) => {
    // this.user = user;
    // this.loggedIn = (user != null);
    // this.currentUser!.email=this.user.email;
    // this.currentUser!.id=this.user.id;
    // this.currentUser!.username=this.user.name;
    // this.currentUser!.firstName=this.user.firstName;
    // this.currentUser!.lastName=this.user.lastName;
    // this.auth.login(this.currentUser!).subscribe(x => localStorage.setItem("token", x));
    // });
    //   console.log(GoogleLoginProvider.PROVIDER_ID)
    //this.authService.signOut();
    this.router.navigateByUrl("google-login");

  }
}
