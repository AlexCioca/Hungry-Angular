import { RecipePageService } from './../../services/recipe-page.service';
import { IRecipeReview } from './../../models/recipe-review';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  review:IRecipeReview={
    userId:0,
    recipeId:0,
    rating:0,
    comment:"",
    recipeReviewId:0
  };
  selected = 0;
	readonly = false;

  constructor(private recipeService:RecipePageService,
    @Inject(MAT_DIALOG_DATA) public data: { recipeId: number },
    public dialogRef: MatDialogRef<any>) {

  }

  addComment(){
    if(this.review.rating == 0)
    {
      alert("Please add a rating");

    }
    else{
      this.review.recipeId=this.data.recipeId;
      this.recipeService.addReview(this.review).subscribe(data=>this.dialogRef.close({data:data}));
     
    }
  }
}
