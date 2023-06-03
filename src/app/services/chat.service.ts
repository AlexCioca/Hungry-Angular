import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:7070/chatsocket")   // mapping to the chathub as in startup.cs
  .configureLogging(signalR.LogLevel.Information)
  .build();

endpoint = 'https://localhost:7070/api';
private receivedMessageObject: Message = new Message();
private sharedObj = new Subject<Message>();

constructor(private http: HttpClient) {
this.connection.onclose(async () => {
await this.start();
});
this.connection.on("ReceiveOne", (user: string, message: string) => { this.mapReceivedMessage(user, message); });
this.start();
}


// Strart the connection
public async start() {
try {
await this.connection.start();
console.log("connected");
} catch (err) {
console.log(err);
setTimeout(() => this.start(), 5000);
}
}

private mapReceivedMessage(user: string, message: string): void {
this.receivedMessageObject.user = user;
this.receivedMessageObject.msgText = message;
this.sharedObj.next(this.receivedMessageObject);
}

public broadcastMessage(msgDto: any) {

return this.http.post<any>(
  `${this.endpoint}/chat/send`,
  msgDto
);
// this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
}

public retrieveMappedObject(): Observable<Message> {
return this.sharedObj.asObservable();
}


}
