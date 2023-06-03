import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: Message) => { this.addToInbox(receivedObj);});

  }

  msgDto: Message = new Message();
  msgInboxArray: Message[] = [];

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto).subscribe();
      }
    }
  }

  addToInbox(obj: Message) {
    let newObj = new Message();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);

  }
}
