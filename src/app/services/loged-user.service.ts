import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogedUserService {

  user?:string='';
  constructor() { }
}
