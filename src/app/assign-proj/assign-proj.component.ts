import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assign-proj',
  templateUrl: './assign-proj.component.html',
  styleUrls: ['./assign-proj.component.css']
})
export class AssignProjComponent implements OnInit {

  
  agent:any;
  project_Id:any;
  company_Id:any;
    
  

  constructor(
    private api:ApiService,
    private route:ActivatedRoute,
    private router:Router
  ) {

    this.project_Id  = this.route.snapshot.paramMap.get('project_Id');
    this.company_Id  = this.route.snapshot.paramMap.get('company_Id');

   }

  ngOnInit() {
 
    this.api.Agent(this.company_Id).subscribe(res => {
      console.log(res);
      this.agent = res;
    });
  }

  assign(data){
     this.api.assign(data,this.project_Id);
    if(data){
      this.router.navigate(['/dashboard']);
    }else{
      console.log('error');
      }
    }
 
  onLogoutClick() {
    this.api.logout();
    this.router.navigate(['/login']);
    return false;
  }
}




