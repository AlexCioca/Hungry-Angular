import { RecipePageService } from 'src/app/services/recipe-page.service';
import { IIngredients } from './../../models/ingredient';
import { RecipeCardService } from './../../services/recipe-card.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css']
})
export class AddIngredientsComponent {


  constructor(private recipeService:RecipePageService,@Inject(MAT_DIALOG_DATA) public data: { recipeId: number },public dialogRef: MatDialogRef<any>) {


  }
  measurements : string[] = ["kilograms","grams","pieces","spoons","liters"]
  measure:string="kilograms";
  ingredientsForm = new FormGroup(
    {
      nameControl: new FormControl('',[Validators.required]),
      quantityControl: new FormControl('',[Validators.required]),
      measurementControl:new  FormControl('',[Validators.required])
    }
  )

    addIngredient()
   {
    let ingredient : IIngredients ={
      ingredientsId:0,
      ingredientsName:this.ingredientsForm.controls['nameControl'].value!,
      measurement:this.measure,
      quantity:this.ingredientsForm.controls['quantityControl'].value!,
      recipeId:this.data.recipeId
    }
     this.recipeService.addIngredient(ingredient).subscribe(data=>this.dialogRef.close({data:data}));

    }

}
