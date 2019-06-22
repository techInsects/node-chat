import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})


export class AgentComponent implements OnInit {
  projects : any;
  project : any;
  company_Id:any;

  constructor(
    private api:ApiService,
    private router:Router,
    private route:ActivatedRoute,
    private http: Http
  ) { 
    this.company_Id  = this.route.snapshot.paramMap.get('company_Id');
  }

  ngOnInit() {

    console.log(this.company_Id)
  
  }

  addagent(data){
    console.log(data)
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/addagent';
    var url = `${apiUrl}/${this.company_Id}`;
    this.http.post(url, data, {headers: headers}).subscribe(res => {
    })
    if(data){
      this.router.navigate(['dashboard']);
    }else{
      console.log('error');
      }
    }

  

    getProject(name){
      this.api.getProject(name)
      .subscribe(res => {
     
        console.log(res);
        this.projects = res;
      }, err => {
        console.log(err);
      });
    }
  getProjectDetails(id) {
    this.api.getProject(id)
    
      .subscribe(data => {
        console.log(id)
        console.log(data);
        this.project = data;
      });
}


onLogoutClick() {
  this.api.logout();
  this.router.navigate(['/login']);
  return false;
}

}