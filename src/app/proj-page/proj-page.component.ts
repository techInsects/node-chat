import { Component, OnInit, AfterViewChecked,OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proj-page',
  templateUrl: './proj-page.component.html',
  styleUrls: ['./proj-page.component.css']
})
export class ProjPageComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chats: any;
  data : any;
  project_Id: any;
  project_name: any;


  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.project_name = this.route.snapshot.paramMap.get('project_name');
    this.project_Id = this.route.snapshot.paramMap.get('project_Id')
  }

  ngOnInit() {

    // this.api.checkChatStatus(this.project_name).subscribe(res => {
    //   this.data = res
    //   if(this.data[0].status  =='1' ){
    //     alert('Support agent is busy you can either or create ticket')
    //   }else{
    //     this.router.navigate(['/member-chat',this.project_name]);
    //   }
    //   console.log(this.data)
    // })

  }

  ngOnDestroy(){

    
  }

  chat(data) {
    this.api.chat(data, this.project_Id,this.project_name);
    // if (data) {
    //   this.router.navigate(['/member-chat',this.project_name]);
    // } else {
    //   console.log('error')
    // }


  }


}
