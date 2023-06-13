export interface Message {
  messageId:number;
  senderId:number;
  reciverId:number;
  messageText:string;
  seen:boolean;
  timeStamp:Date;
}
