import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  messages: string[] = [];

  add(message: string) {
    this.clear();
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
