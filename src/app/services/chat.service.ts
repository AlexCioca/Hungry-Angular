import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection?: signalR.HubConnection;

  endpoint = 'https://localhost:7070/api'
  constructor(private http:HttpClient) { }

  startConnection() {
    this.hubConnection! = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7070/chatsocket',{ accessTokenFactory: () => this.getUserToken()! })
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection established.'))
      .catch(err => console.error('Error while starting SignalR connection:', err));
  }

  sendMessage(message: Message) {
    this.hubConnection?.invoke('SendMessage', message)
      .then(() => console.log('Message sent.'))
      .catch(err => console.error('Error while sending message:', err));
  }

  receiveMessage(callback: (message: Message) => void) {
    this.hubConnection?.on('ReceiveMessage', (message: Message) => {
      this.seenMessage(message).subscribe();
      callback(message);
    });
  }

  stopConnection() {
    this.hubConnection?.stop()
      .then(() => console.log('SignalR connection stopped.'))
      .catch(err => console.error('Error while stopping SignalR connection:', err));
  }

  getUserToken()
  {
    let tok = localStorage.getItem('token');
    return tok;
  }

  getConversationMessages(reciverId:number)
  {
    return this.http.get<Message[]>(`${this.endpoint}/chat/GetConversationMessages?receiverId=`+reciverId);
  }

  getNewMessagesForUser()
  {
    return this.http.get<Message[]>(`${this.endpoint}/chat/GetNewMessagesForUser`);
  }

  seenMessage(message:Message)
  {
    return this.http.put<Message[]>(`${this.endpoint}/chat/SeenMessage`,message);
  }

}


















