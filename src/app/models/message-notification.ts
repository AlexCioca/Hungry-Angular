import { Message } from 'src/app/models/message';
export interface MessageNotification{
  userId:number;
  username:string;
  userPhoto:string;
  message:Message;
}
