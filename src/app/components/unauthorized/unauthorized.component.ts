import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(private router:Router) {

  }
  goHome()
  {
    this.router.navigateByUrl("home");
  }

}
