import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,MatToolbarModule,  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatIconModule, MatCardModule,MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { AgentComponent } from './agent/agent.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AgentBoardComponent } from './agent-board/agent-board.component';
import {AuthGuard} from './auth.guard';
import {AgentGuard} from './agent.guard';
import {ApiService} from './api.service';
import {TokenInterceptorService} from './token-interceptor.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import {ChatService} from './chat.service';
import { HttpModule } from '@angular/http';
import { NgIf } from '@angular/common';
import { ProjPageComponent } from './proj-page/proj-page.component';
import { ChatComponent } from './chat/chat.component';
import { AssignProjComponent } from './assign-proj/assign-proj.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MemberChatComponent } from './member-chat/member-chat.component';
import { RouterModule, Routes } from '@angular/router';
  import {  
    PlatformLocation,  
    Location,  
    LocationStrategy,  
    HashLocationStrategy,  
    PathLocationStrategy,  
    APP_BASE_HREF
  } from '@angular/common';

  
import { EditProjDetailComponent } from './edit-proj-detail/edit-proj-detail.component';
import { ChatBoardComponent } from './chat-board/chat-board.component';

import { HeaderComponent } from './header/header.component';
import { ChatsComponent } from './chats/chats.component'

const AppRoutes : Routes  = [
    {path : "register" , component :RegisterComponent },
    {path : "login" , component :LoginComponent},
    {path : "dashboard" , component :DashboardComponent,canActivate: [AuthGuard]},
    {path : "agent/:company_Id" , component :AgentComponent,canActivate: [AuthGuard] },
    {path : "project/:company_Id" , component :ProjectComponent ,canActivate: [AuthGuard]},
    {path : "project-detail/:project_name" , component :ProjectDetailComponent ,canActivate: [AuthGuard] },
    {path : "agent-board" , component :AgentBoardComponent,canActivate: [AgentGuard]},
    {path : "agent-login", component :AgentLoginComponent},
    {path : "chat-board" , component :ChatBoardComponent},
    {path : "proj-page/:project_name/:project_Id" ,component :ProjPageComponent}, 
    {path : "chat/:project_name" , component :ChatComponent}, 
    {path : "assign-proj/:company_Id/:project_Id" , component :AssignProjComponent, canActivate: [AuthGuard]},
    {path : "member-chat/:project_name" , component :MemberChatComponent},
    {path : "edit-proj-detail/:agent-Id:" , component :EditProjDetailComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full'}  
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProjectComponent,
    AgentComponent,
    ProjectDetailComponent,
    AgentBoardComponent,
    AgentLoginComponent,
    ProjPageComponent,
    ChatComponent,
    AssignProjComponent,
    MemberChatComponent,
    EditProjDetailComponent,
    ChatBoardComponent,
    HeaderComponent,
    ChatsComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,MatToolbarModule,MatCardModule,MatInputModule,MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    HttpModule,
    MatFormFieldModule,MatPaginatorModule,
    RouterModule.forRoot( AppRoutes ),
    NgFlashMessagesModule.forRoot() 
 ],
  providers: [AuthGuard,AgentGuard,ApiService,ChatService,{provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})



export class AppModule { }



