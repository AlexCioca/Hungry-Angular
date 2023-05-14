import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['login']);
    return false;
  }
}
