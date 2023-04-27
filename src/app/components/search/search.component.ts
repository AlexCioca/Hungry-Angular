import { ICategory } from './../../models/category';
import { SearchService } from './../../services/search.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { IRecipe } from 'src/app/models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  options: string[] = [];
  myControl = new FormControl('');
  categoryControl = new FormControl('');
  recipeList: IRecipe[] = [];
  categories: ICategory[] = [];

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchService.getRecipes().subscribe((data) => {
      for (let i = 0; i < Object.values(data)[0].length; i++) {
        this.options.push(Object.values(data)[0].at(i) as string);
      }
    });
    this.searchService
      .getCategories()
      .subscribe((cat) => (this.categories = cat));
  }

  search() {


    this.searchService
      .getSearchResult(
        this.categories.find((x) => x.name == this.categoryControl.value)
          ?.categoryId!,
        this.myControl.value?.toString()!
      )
      .subscribe((data) => {this.recipeList = data;
      });
  }

  openRecipePage(recipe: any) {
    if (recipe) {
      this.router.navigateByUrl('recipe-page/' + recipe?.recipeId);
    } else {
      this.router.navigateByUrl('recipe-page');
    }
  }
}
