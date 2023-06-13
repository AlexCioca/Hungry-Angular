import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeCardModuleComponent } from './components/recipe-card-module/recipe-card-module.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component'
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {MatDialogModule} from '@angular/material/dialog';
import {ChangeRecipePhotosComponent } from './components/change-recipe-photos/change-recipe-photos.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { EditCreateRecipeComponent } from './components/edit-create-recipe/edit-create-recipe.component';
import { httpInterceptor } from './services/httpInterceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { PeopleComponent } from './components/people/people.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersRecipesComponent } from './components/users-recipes/users-recipes.component';
import { SearchComponent } from './components/search/search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { AddIngredientsComponent } from './components/add-ingredients/add-ingredients.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { AddStepComponent } from './components/add-step/add-step.component';
import { LikedRecipesComponent } from './components/liked-recipes/liked-recipes.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { SurpriseRecipesComponent } from './components/surprise-recipes/surprise-recipes.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageNotificationsComponent } from './components/message-notifications/message-notifications.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    NavBarComponent,
    RecipeCardModuleComponent,
    RecipePageComponent,
    ChangeRecipePhotosComponent,
    EditCreateRecipeComponent,
    ProfileComponent,
    PeopleComponent,
    UsersRecipesComponent,
    SearchComponent,
    AddIngredientsComponent,
    AddCommentComponent,
    AddStepComponent,
    LikedRecipesComponent,
    UnauthorizedComponent,
    SurpriseRecipesComponent,
    UserProfileComponent,
    ChatComponent,
    MessageNotificationsComponent,
    AdminPanelComponent,
    TicketComponent,
    CreateTicketComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatSelectModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgbModule,
    NgImageSliderModule,
    AppRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MdbCarouselModule,
    MatToolbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7299"],
        disallowedRoutes: []
      }
  }),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers:
  [
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,

        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '379678519318-lcn8e34lm3gp69dh1bit25585dful332.apps.googleusercontent.com',
              {scopes:'email'}
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
