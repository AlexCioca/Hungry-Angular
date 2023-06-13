import { RecipePageService } from './../../services/recipe-page.service';
import { ITicket } from './../../models/ticket';
import { TicketService } from './../../services/ticket.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent {
  ticket?: ITicket;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private ticketService: TicketService,
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    private recipeService:RecipePageService
  ) {
    ticketService.getTicketById(data.id).subscribe((data) => {
      this.ticket = data;
    });
  }

  goToRecipePage() {
    this.router.navigateByUrl('/recipe-page/' + this.ticket?.recipeId);
    this.dialogRef.close();

  }
  deleteRecipe()
  {
    this.recipeService.deleteRecipe(this.ticket?.recipeId!).subscribe();
    this.ticketService.CompleteTicket(this.data.id).subscribe();
    this.dialogRef.close();
  }
}
