import { IRecipeImages } from './../../models/recipe-image';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RecipePageService } from 'src/app/services/recipe-page.service';
import { ImageEncode } from 'src/app/utils/image-encoder';

@Component({
  selector: 'app-change-recipe-photos',
  templateUrl: './change-recipe-photos.component.html',
  styleUrls: ['./change-recipe-photos.component.css'],
})
export class ChangeRecipePhotosComponent {
  photos: IRecipeImages[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public _sanitizer: DomSanitizer,
    private recipePageService: RecipePageService,
    public dialogRef: MatDialogRef<any>
  ) {

    this.recipePageService
      .getRecipePhotos(this.data.id)
      .subscribe((x) => (this.photos = x));
  }
  ngOnInit(): void {}

  async choosePhoto(id: number) {
    (await this.recipePageService.deletePhoto(id)).subscribe(
    );
    (await this.recipePageService.getRecipePhotos(this.data.id)).subscribe(
      (x) => (this.photos = x)
    );
  }

  close() {
    this.dialogRef.close();
  }

  async upload(event: any) {
    let imageCode = await ImageEncode.fileToByteArray(event.target.files[0]);

    const recipeImage: IRecipeImages = {
      recipeImageId: 0,
      image: imageCode as string,
      recipeId: this.data.id,
    };

    (await this.recipePageService.addPhotoToRecipe(recipeImage)).subscribe();
    (await this.recipePageService.getRecipePhotos(this.data.id)).subscribe(
      (x) => (this.photos = x)
    );
  }
}
