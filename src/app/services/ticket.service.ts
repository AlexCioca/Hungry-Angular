import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITicket } from '../models/ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  endpoint = 'https://localhost:7070/api'
  constructor(private http:HttpClient) { }

  getTickets()
  {
    return this.http.get<ITicket[]>(`${this.endpoint}/Ticket/GetTickets`);
  }
  getTicketById(id:number)
  {
    return this.http.get<ITicket>(`${this.endpoint}/Ticket/GetTicketById?ticketId=`+id);
  }
  CompleteTicket(id:number)
  {
    return this.http.delete<ITicket>(`${this.endpoint}/Ticket/CompleteTicket?ticketId=`+id);
  }
  createTicket(ticket:ITicket)
  {
    return this.http.post<ITicket>(`${this.endpoint}/Ticket/CreateTicket`,ticket);
  }


}
