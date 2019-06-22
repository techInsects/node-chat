import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { error } from 'util';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';



@Injectable({
  providedIn: 'root'
})

export class ApiService {


  authToken: any;
  agentToken:any;
  userData: any;
  agent:any;

  constructor(
    private http: Http,
    private router: Router,
    


  ) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  registerUser(user) {
    this.http.post('http://localhost:3000/api/register', user).subscribe(res => {
      console.log(res);

    })
  }

  storeUserData(token,user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.userData = user; 
  }

  storeAgentData(token,user) {
    localStorage.setItem('agent-token', token);
    localStorage.setItem('agent', user);
    this.agentToken = token;
    this.agent = user; 
  }


  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateAgent(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/agentlogin', user, {headers: headers})
      .map(res => res.json());
  }

  
  checkChatStatus(project_name) {
    let headers  =  new Headers();
    headers.append('Content-Type', 'application/json');
    var apiUrl = 'http://localhost:3000/api/checkChatStatus';
    const url = `${apiUrl}/${project_name}`;
    return this.http.get(url, {headers: headers})
      .map(res => res.json());
  }


  getDashboard() {
    let headers = new Headers();
    this.loadToken();
    this.comapanyId();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/dashboard', {headers: headers}).map(res => res.json());
  }

  getAgentboard() {
    let headers = new Headers();
    this.loadAgentToken();
    this.AgentId();
    headers.append('Authorization', this.agentToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/agent-board', {headers: headers}).map(res => res.json());
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  loadAgentToken() {
    const token = localStorage.getItem('agent-token');
    this.agentToken = token;
  
  }

  comapanyId() {
    const user = localStorage.getItem('user');
    this.userData = user;
    console.log(this.userData)
  }

  AgentId() {
    const user = localStorage.getItem('agent');
    this.agent= user;
    console.log(this.agent);
  }

  agentlogout() {
    localStorage.removeItem('agent-token');
    localStorage.removeItem('agent');
  }

  AgentLogout(name): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/checkstatus';
    const url = `${apiUrl}/${name}`;
    console.log(name);
    return this.http.post(url, {headers: headers}).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

   loggedIn() {
    return tokenNotExpired('token');
  }



  agentlogIn(){
    return tokenNotExpired('agent-token');
  }


  addproject(data, company_Id) {
    
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/addproject';
    const url = `${apiUrl}/${company_Id}`;
    return this.http.post(url, data, {headers: headers}).subscribe(res => {
    })
    
  }

  updateChatStatus(project_name){
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/updateChatStatus';
    const url = `${apiUrl}/${project_name}`;
    return this.http.put(url, {headers: headers}).map(res => res.json())
  }


  closeChat(project_Id){
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/closeChat';
    const url = `${apiUrl}/${project_Id}`;
    return this.http.put(url, {headers: headers}).subscribe(res => {
    })
  }

  chat(data, project_Id,project_name) {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/chat';
    var url = `${apiUrl}/${project_Id}/${project_name}`;
    return this.http.post(url, data, {headers: headers}).subscribe(res => {
      console.log(res);

    })
  }

  addagent(data, company_Id) {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/addagent';
    var url = `${apiUrl}/${company_Id}`;
    return this.http.post(url, data, {headers: headers}).map(res => res.json());
  }

  assign(data, project_Id) {
    console.log('projectID',project_Id)
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/assignProj';
    var url = `${apiUrl}/${project_Id}`;
    return this.http.post(url, data, {headers: headers}).subscribe(res => {
      console.log(res);

    })
  }

  getProjects(company_Id): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/project';
    const url = `${apiUrl}/${company_Id}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }

  getContacts(): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/find_customers';
    const url = `${apiUrl}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }

  getTicket(): Observable<any> {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/api/getTicket', {headers: headers}).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  Agent(company_Id): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/agent';
    const url = `${apiUrl}/${company_Id}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }


  getAgent(project_name): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/agentName';
    const url = `${apiUrl}/${project_name}`;
    return this.http.get(url, {headers: headers}).map(res => {
      res.json()
    });
  

  }

  
  findChat(agent_name): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/find';
    const url = `${apiUrl}/${agent_name}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }


  agentData(agent_name): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/agentData';
    const url = `${apiUrl}/${agent_name}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }

  companyData(company_Id): Observable<any> {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    var apiUrl = 'http://localhost:3000/api/companyData';
    const url = `${apiUrl}/${company_Id}`;
    console.log(name)
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }

  getAgentName(name): Observable<any> {
    let headers = new Headers();
    var apiUrl = 'http://localhost:3000/api/agentName';
    const url = `${apiUrl}/${name}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());

  }

  getProject(name): Observable<any> {
    let headers = new Headers();
    console.log(name)
    var apiUrl = 'http://localhost:3000/api/project';
    const url = `${apiUrl}/${name}`;
    return this.http.get(url, {headers: headers}).map(res => res.json());
  }




  saveMsg(data) {
    this.http.post('http://localhost:3000/api/msg', data).subscribe(res => {
      console.log(res);

    })
  }

  getMsg(): Observable<any> {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/api/getmsg', {headers: headers}).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}


