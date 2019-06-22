import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {
  name: String;
  password:String;
  message = '';
  data: any;
  project:any
  invalidLogin: boolean = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
    private route :ActivatedRoute,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {

    if(this.api.agentlogIn()){
      this.router.navigate(['agent-board'])
    }


  
  }

  loginAgent(){
      const user = {
        name: this.name,
        password: this.password
      }
  
      this.api.authenticateAgent(user).subscribe(data => {
          if(data.success) {
            this.api.storeAgentData(data.token,data.user.name);
            this.router.navigate(['agent-board']);
          } else {
            this.router.navigate(['/agent-login']);
          }
      });

  }
  
   


  
  onLogoutClick() {

    console.log(this.data.name)
    localStorage.removeItem("agent-token");
    this.router.navigate(['/agent-login']);
    return false;
  }


}
