import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageNotification } from './../../models/message-notification';
import { ChatService } from 'src/app/services/chat.service';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ChangeRecipePhotosComponent } from '../change-recipe-photos/change-recipe-photos.component';
import { Message } from 'src/app/models/message';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-message-notifications',
  templateUrl: './message-notifications.component.html',
  styleUrls: ['./message-notifications.component.css'],
})
export class MessageNotificationsComponent {
  newMessages: MessageNotification[] = [];
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    public _sanitizer: DomSanitizer,
    private router: Router,
    public dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    this.chatService.getNewMessagesForUser().subscribe((data) => {
      data.forEach((element) => {
        this.userService.getUserById(element.senderId).subscribe((user) => {
          let mes: MessageNotification = {
            userId: user.userId,
            username: user.username,
            userPhoto: user.photo,
            message: element,
          };
          this.newMessages.push(mes);
        });
      });
    });
  }

  goToMessage(message: Message) {

    this.chatService.seenMessage(message).subscribe((data) => {

      this.router.navigateByUrl('/chat/' + message.senderId);
      this.dialogRef.close();
    });
  }
}
