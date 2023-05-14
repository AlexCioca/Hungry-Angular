import { IRecipeSteps } from './../../models/recipe-steps';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipeReview } from 'src/app/models/recipe-review';
import { RecipePageService } from 'src/app/services/recipe-page.service';

@Component({
  selector: 'app-add-step',
  templateUrl: './add-step.component.html',
  styleUrls: ['./add-step.component.css']
})
export class AddStepComponent {

  step:IRecipeSteps={
    recipeStepsId:0,
    description:"",
    recipeId:0
  };
  selected = 0;
	readonly = false;

  constructor(private recipeService:RecipePageService,
    @Inject(MAT_DIALOG_DATA) public data: { recipeId: number },
    public dialogRef: MatDialogRef<any>) {

  }

  addStep(){
    if(this.step.description == null)
    {
      alert("Please add a description");

    }
    else{
      this.step.recipeId=this.data.recipeId;
      this.recipeService.addStep(this.step).subscribe(data=>this.dialogRef.close({data:data}));
     
    }
  }
}
