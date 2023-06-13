import { TicketComponent } from './../ticket/ticket.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ITicket } from './../../models/ticket';
import { TicketService } from './../../services/ticket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  tickets:ITicket[]=[];
  constructor(private ticketService:TicketService,public dialogRef: MatDialog){
    this.ticketService.getTickets().subscribe(data =>{
      this.tickets=data;
    
    })
  }

  openTicket(id:number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    dialogConfig.data = {
      id:id
    };

    const dialog = this.dialogRef.open(
      TicketComponent,
      dialogConfig
    );

    dialog.afterClosed().subscribe((id) => {window.location.reload()});
  }

}
