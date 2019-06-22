import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 

  message: string;
  messages: string[] = [];  



  constructor(
    private chatService: ChatService
  ) { }

  
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
    console.log(this.message)
  }

  ngOnInit() {

    this.chatService.getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });

    
  }

}
