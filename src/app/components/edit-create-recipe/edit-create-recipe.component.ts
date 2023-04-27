import { IRecipe } from './../../models/recipe';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { IIngredients } from 'src/app/models/ingredient';
import { IRecipeImages } from 'src/app/models/recipe-image';
import { IRecipeSteps } from 'src/app/models/recipe-steps';
import { IUser } from 'src/app/models/user';
import { RecipePageService } from 'src/app/services/recipe-page.service';
import { IRecipeReview } from 'src/app/models/recipe-review';
import { UserService } from 'src/app/services/user.service';
import { ImageEncode } from 'src/app/utils/image-encoder';
import { ChangeRecipePhotosComponent } from '../change-recipe-photos/change-recipe-photos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-create-recipe',
  templateUrl: './edit-create-recipe.component.html',
  styleUrls: ['./edit-create-recipe.component.css']
})
export class EditCreateRecipeComponent {
  recipe?: IRecipe;
  photos?: IRecipeImages[] = [];
  imgCollection: Array<{ image: string; thumbImage?: string; title?: string;imageId:number }> =[];
  owner?: IUser;
  ingredients: IIngredients[] = [];
  steps: IRecipeSteps[] = [];
  reviews: IRecipeReview[] = [];
  difficulties:string[]=['Easy','Medium','Hard']

  recipeForm = new FormGroup({
  nameControl : new FormControl('',[Validators.required]),
  descriptionControl : new FormControl(''),
  difficultyControl : new FormControl(''),
  preparationControl : new FormControl('',[Validators.pattern("^[0-9]*$")]),
  servesControl : new FormControl('',[Validators.pattern("^[0-9]*$")])
})

  newRecipe:number=parseInt(this.activatedRouter.snapshot.paramMap.get('id')!);
   constructor(
    private activatedRouter: ActivatedRoute,
    private recipePageService: RecipePageService,
    public _sanitizer: DomSanitizer,
    private userService: UserService,
    config: NgbRatingConfig,
    public dialogRef:MatDialog,

  ) {
    config.max = 5;
		config.readonly = true;
    if (parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)) {
      recipePageService
        .getRecipeById(
          parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
        )
        .subscribe((x) => {
          this.recipe = x;
          this.recipeForm.controls['nameControl'].setValue(this.recipe.name);
          this.recipeForm.controls['descriptionControl'].setValue(this.recipe.description);
          this.recipeForm.controls['difficultyControl'].setValue(this.recipe.difficulty);
          this.recipeForm.controls['preparationControl'].setValue(this.recipe.preparationTime.toString());
          this.recipeForm.controls['servesControl'].setValue(this.recipe.serves.toString());
          this.userService
            .getUserById(this.recipe?.userId!)
            .subscribe((data) => {
              this.owner = data;
            });
          this.recipePageService
            .getRecipeIngredients(this.recipe?.recipeId!)
            .subscribe((data) => (this.ingredients = data));
          this.recipePageService
            .getRecipeSteps(this.recipe?.recipeId!)
            .subscribe((data) => (this.steps = data));
          this.recipePageService
            .getRecipeReviews(this.recipe?.recipeId!)
            .subscribe((data) => (this.reviews = data));
        });
    }
  }
  ngOnInit(): void {
    if (parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)){
    this.recipePageService
      .getRecipePhotos(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => {
        this.photos = data;
        data.forEach((image) => {
          this.imgCollection.push({
            image: image.image,
            thumbImage: image.image,
            title: '',
            imageId:image.recipeImageId
          });
        });
      });}
  }
  async upload(event: any) {
    let imageCode = await ImageEncode.fileToByteArray(event.target.files[0]);

    const recipeImage: IRecipeImages = {
      recipeImageId: 0,
      image: imageCode as string,
      recipeId: parseInt(this.activatedRouter.snapshot.paramMap.get('id')!),
    };
    (await this.recipePageService.addPhotoToRecipe(recipeImage)).subscribe();
  }

  changePhotos() {
    let id = parseInt(this.activatedRouter.snapshot.paramMap.get('id')!);
    const dialogConfig = new MatDialogConfig();


    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    dialogConfig.data = {
      id,
    };

    const dialog = this.dialogRef.open(
      ChangeRecipePhotosComponent,
      dialogConfig
    );

    dialog.afterClosed().subscribe((data) => {
      this.recipePageService
      .getRecipePhotos(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => {
        this.photos = data;
        data.forEach((image) => {
          this.imgCollection.push({
            image: image.image,
            thumbImage: image.image,
            title: '',
            imageId:image.recipeImageId
          });
        });
      });
    });
  }

  saveChanges()
  {
   let newRecipe:IRecipe={
    name:this.recipeForm.controls['nameControl']?.value!,
    description: this.recipeForm.controls['descriptionControl']?.value!,
    difficulty:this.recipeForm.controls['difficultyControl']?.value!,
    preparationTime:Number(this.recipeForm.controls['preparationControl']?.value!),
    serves:Number(this.recipeForm.controls['servesControl']?.value!),
    userId:0,
    recipeId:0,
    mainPhoto:'',
    createdDate:new Date(Date.now()),
   }

    // this.recipe?.name!= this.recipeForm.controls['nameControl']?.value;
    // this.recipe?.description!= this.recipeForm.controls['descriptionControl']?.value!;
    // this.recipe?.difficulty!= this.recipeForm.controls['difficultyControl']?.value!;
    // this.recipe?.preparationTime!= Number(this.recipeForm.controls['preparationControl']?.value!);
    // this.recipe?.serves!= Number(this.recipeForm.controls['servesControl']?.value!);
    console.log(newRecipe)
    this.userService.getUserByToken(localStorage.getItem('token')!).subscribe(data=>{
    newRecipe.userId=data.userId;
    this.recipePageService.addRecipe(newRecipe).subscribe();
   })


  }
  updateRecipe(){

    this.recipe!.name= this.recipeForm.controls['nameControl']?.value!;
    this.recipe!.description= this.recipeForm.controls['descriptionControl']?.value!;
    this.recipe!.difficulty= this.recipeForm.controls['difficultyControl']?.value!;
    this.recipe!.preparationTime= Number(this.recipeForm.controls['preparationControl']?.value!);

    this.recipePageService.updateRecipe(this.recipe!).subscribe();
  }
}
