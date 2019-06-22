import { Component, OnInit,AfterViewChecked,HostListener,OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-member-chat',
  templateUrl: './member-chat.component.html',
  styleUrls: ['./member-chat.component.css']
})
export class MemberChatComponent implements OnInit,OnDestroy{
  @HostListener('window:unload', ['$event'])
  
  public unloadHandler($event) {
    $event.returnValue = "Are you sure?";
  }

  data : any;
  project_name: any;
  message: string;
  messages: string[] = [];  
  constructor(
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,
  ) { 
    this.project_name = this.route.snapshot.paramMap.get('project_name');
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
    console.log(this.message)
  }

  ngOnDestroy() { 
    alert('danger');
    console.log('OnDestroy');
    this.api.closeChat(this.project_name);
  }

  ngOnInit() {
    
    this.api.checkChatStatus(this.project_name).subscribe(res => {
      this.data = res
      if(this.data[0].status  =='1'){
        alert('Support agent is busy you can either or create ticket')
      }
      console.log(this.data)
    })


    this.chatService.getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
  }

}
