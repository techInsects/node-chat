import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project_name:any;  
  agent:any;
  
  constructor(
    private api:ApiService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.project_name  = this.route.snapshot.paramMap.get('project_name');
   }

  ngOnInit() {
 
    console.log(this.project_name)

    this.api.getAgent(this.project_name)
    .subscribe(data => {
      console.log(data);
      this.agent = data;
    }); 
  
  }

 

  onLogoutClick() {
    this.api.logout();
    this.router.navigate(['/login']);
    return false;
  }
}


