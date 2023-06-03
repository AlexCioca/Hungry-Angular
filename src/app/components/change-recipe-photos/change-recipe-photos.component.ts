import { IRecipeImages } from './../../models/recipe-image';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RecipePageService } from 'src/app/services/recipe-page.service';
import { ImageEncode } from 'src/app/utils/image-encoder';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-change-recipe-photos',
  templateUrl: './change-recipe-photos.component.html',
  styleUrls: ['./change-recipe-photos.component.css'],
})
export class ChangeRecipePhotosComponent {
  photos: IRecipeImages[] = [];
  obs =  new Observable();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public _sanitizer: DomSanitizer,
    private recipePageService: RecipePageService,
    public dialogRef: MatDialogRef<any>
  ) {

  }
  ngOnInit():void {

    this.obs=this.recipePageService.getRecipePhotos(this.data.id);
    this.obs.subscribe(data=> this.photos=data as IRecipeImages[]);

  }

  async choosePhoto(id: number) {
    (this.recipePageService.deletePhoto(id)).subscribe(
    );
    console.log(this.photos)


    this.photos.splice(this.photos.findIndex(x => x.recipeImageId==id),1);
    console.log(this.photos)
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

    ( this.recipePageService.addPhotoToRecipe(recipeImage)).subscribe(data=>this.photos.push(data));

  }
}
