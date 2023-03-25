import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes:Routes=[


  {path:"google-login",component:GoogleLoginComponent,pathMatch:'full'},
  {path:"sign-up", component:SignUpComponent,pathMatch:'full'},
  {path:"home", component:HomeComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path: '',redirectTo:'home' , pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
