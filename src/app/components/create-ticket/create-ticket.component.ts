import { ActivatedRoute } from '@angular/router';
import { RecipePageService } from './../../services/recipe-page.service';
import { UserService } from './../../services/user.service';
import { TicketService } from './../../services/ticket.service';
import { ITicket } from './../../models/ticket';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent {
  ticket?: ITicket={
    ticketId:0,
    userId:0,
    recipeId:0,
    reason:""
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<any>,
    private ticketService: TicketService,
    private recipeService: RecipePageService,
    private activatedRouter: ActivatedRoute
  ) {

  }
  createTicket() {

    this.recipeService.getRecipeById(this.data.id).subscribe((data) => {
      this.ticket!.recipeId= data.recipeId;
      this.ticket!.userId= data.userId;
      this.ticketService
        .createTicket(this.ticket!)
        .subscribe((data) => console.log(data));
    });
  }
}
