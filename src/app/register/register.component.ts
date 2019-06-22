import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router:Router
  ) { }

  ngOnInit() {

    if(this.api.loggedIn()){
      this.router.navigate(['dashboard'])
    }

  }

  registerUser(user){
    this.api.registerUser(user);
    
  }

  onLogoutClick() {
    this.api.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
