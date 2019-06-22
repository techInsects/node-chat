import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  company_Id:any;

  constructor(
    private api:ApiService,
    private router:Router,
    private route :ActivatedRoute
    
  ) {
    this.company_Id  = this.route.snapshot.paramMap.get('company_Id');
   }

  ngOnInit() {
  
  
    console.log( this.company_Id)
  }

   addproject(data){
    this.api.addproject(data, this.company_Id);
    // if(data){
    //   this.router.navigate(['dashboard']);
    // }else{
    //   console.log('error');
    //   }
    
  }

  onLogoutClick() {
    this.api.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
