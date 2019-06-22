import { Component, OnInit, AfterViewChecked,ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Location } from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-agent-board',
  templateUrl: './agent-board.component.html',
  styleUrls: ['./agent-board.component.css']
})
export class AgentBoardComponent implements OnInit {
 
  data:any;
  user:any;
  projects:any;
  agent_Id:any;
  agent_name:any;
  interval: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private ngFlashMessageService: NgFlashMessageService,
    private location: Location
 
   

  ) { 
    this.agent_Id  = this.route.snapshot.paramMap.get('id');
    this.agent_name  = this.route.snapshot.paramMap.get('name');
    console.log()
    
  }

  ngOnInit() {
    var name  = localStorage.getItem('agent');
 
    this.api.agentData(name).subscribe(res => {
      console.log(this.agent_name)
      this.user = res;
    }, err => {
      console.log(err);
    }); 

    //Find Chats of projects allocated to user
    //findChat function is written in api.service.ts 
    this.api.findChat(name).subscribe(res => {
      console.log('success')
      this.data = res
    }, err => {
      console.log(err);
    });
    this.interval = setInterval(() => {
    }, 9000);


  }



    

    
  
  onLogoutClick()
  {
    
    this.api.agentlogout();
    this.router.navigate(['/agent-login']);
    return false;
  }

  update(name) {
    this.api.updateChatStatus(name).subscribe(res => {
      console.log(this.agent_name)
      this.user = res;
    }, err => {
      console.log(err);
    }); 
   
  }

  close(project_Id) {
    this.api.closeChat(project_Id);
  }
}
