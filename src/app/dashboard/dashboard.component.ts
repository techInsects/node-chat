import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

import {Router} from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:Object;
  projects : any;

  constructor(
    private api:ApiService,
    private router:Router
  ) { }

  ngOnInit() {
  
    
    var id  = localStorage.getItem('user')

     this.api.getDashboard().subscribe(res => {
      this.user = res.user;
    },
     err => {
       console.log(err);
       return false;
     });

     this.api.getProjects(id)
     .subscribe(res => {
      this.projects = res;
      console.log(this.projects);
     }, err => {
       console.log(err);
     });
     

  }

  onLogoutClick() {
    this.api.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
