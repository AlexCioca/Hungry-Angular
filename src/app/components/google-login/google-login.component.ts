import { AppRoutingModule } from './../../app-routing.module';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ExternalAuthDto } from 'src/app/models/auth-dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent {

  constructor() {}


}
