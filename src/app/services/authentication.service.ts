import { InternalLogin } from './../models/internal-auth-dto';
import { InternalSignUp } from './../models/intternal-sign-up-dto';
import { ExternalAuthDto } from './../models/auth-dto';
import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  endpoint = 'https://localhost:7070/api/Login';

  HTTPOptions:Object = {

    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    responseType: 'text'
 }

  constructor(private http: HttpClient) { }

   login(auth:ExternalAuthDto) {
    return this.http.post<string>(`${this.endpoint}/LoginWithGoogle`,auth,this.HTTPOptions);
  }

  internalSignUp(auth:InternalSignUp){
    return this.http.post<string>(`${this.endpoint}/SignUp`,auth,this.HTTPOptions);
  }
  internalLogin(auth:InternalLogin){
    return this.http.post<string>(`${this.endpoint}/InternalLogin`,auth,this.HTTPOptions);
  }

}
