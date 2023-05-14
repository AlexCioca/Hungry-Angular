import { SurpriseRecipesComponent } from './components/surprise-recipes/surprise-recipes.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LikedRecipesComponent } from './components/liked-recipes/liked-recipes.component';
import { SearchComponent } from './components/search/search.component';
import { UsersRecipesComponent } from './components/users-recipes/users-recipes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditCreateRecipeComponent } from './components/edit-create-recipe/edit-create-recipe.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PeopleComponent } from './components/people/people.component';


const routes:Routes=[
  {path:"google-login",component:GoogleLoginComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"edit-create-recipe/:id", component:EditCreateRecipeComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"edit-create-recipe", component:EditCreateRecipeComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"home", component:HomeComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"users-recipes", component:UsersRecipesComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"recipe-page/:id", component:RecipePageComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"search-page",component:SearchComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"profile",component:ProfileComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"surprize-recipes",component:SurpriseRecipesComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"unauthorized",component:UnauthorizedComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:"people",component:PeopleComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:'liked-recipes',component:LikedRecipesComponent,pathMatch:'full', canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:"sign-up", component:SignUpComponent,pathMatch:'full'},
  {path: '',redirectTo:'home' , pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
