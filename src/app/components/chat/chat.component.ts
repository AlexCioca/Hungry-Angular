import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { IUser } from 'src/app/models/user';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  private forbiddenWords : string[]=['calculator','pisoi','raul']
  user?: IUser;
  @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChild('message') messageInput!: ElementRef;
  conversationMessages: Message[] = [];
  scrollHeight: number = 0;
  recivingUserId:number=parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    public _sanitizer: DomSanitizer
  ) {}
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  ngOnInit() {
    this.chatService.startConnection();
    this.chatService.receiveMessage((message) => {

      this.conversationMessages.push(message);
    });
    this.userService
      .getUserById(parseInt(this.activatedRouter.snapshot.paramMap.get('id')!))
      .subscribe((data) => (this.user = data));
    this.chatService
      .getConversationMessages(
        parseInt(this.activatedRouter.snapshot.paramMap.get('id')!)
      )
      .subscribe((data) => {this.conversationMessages = data;
      });
  }

  sendMessage(text: string) {
    if(text){
      if(this.forbiddenWords.includes(text))
      {
        text="****";
      }
    let message: Message = {
      messageId: 0,
      senderId: this.user?.userId!,
      reciverId: parseInt(this.activatedRouter.snapshot.paramMap.get('id')!),
      messageText: text,
      seen: false,
      timeStamp: new Date(),
    };
    this.conversationMessages.push(message);
    this.chatService.sendMessage(message);
    this.messageInput.nativeElement.value = '';
  }
  }

  scrollToBottom() {
    const divElement: HTMLElement = this.myDiv.nativeElement;
    this.scrollHeight = divElement.scrollHeight;
    divElement.scrollTop = this.scrollHeight;
  }
  ngOnDestroy() {
    this.chatService.stopConnection();
  }
  checkDate(date:Date){

    const now =new Date();
    const time= new Date(date);
    const oneDay =Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(time.getFullYear(), time.getMonth(), time.getDate()) ) /(1000 * 60 * 60 * 24));
    if(oneDay>0)
      return true;
    return false;
  }
}
