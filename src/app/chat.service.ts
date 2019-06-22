import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class ChatService {
    current_url : any;
   socket:any;

  constructor() {
      this.socket = io('http://localhost:3000');


    //   var  current_url = window.location.href;
    //   var url_parts = current_url.split("/");
    //   var current_page = url_parts[url_parts.length-2];
    //   var room_specific = url_parts[url_parts.length-1];
  
  
    //   var socket_connect = function (room) {
    //       return io('localhost:3000', {
    //        query: 'r_var='+room_specific
    //       });
    //   }
  
    //   this.socket = socket_connect(room_specific);
     
  }

  
  public sendMessage(message) {
      this.socket.emit('new-message', message);
      this.socket.emit('login',{userId:'YourUserID'});

  }

  

  public getMessages = () =>{
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
      });
  }


  

}