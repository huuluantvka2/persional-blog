import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketClientService {
  socket: any
  constructor() { }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    setTimeout(() => {
      this.socket.emit('emit-hello', 'nooooooo')
    }, 3000)
    this.socket.on('receive-emit-hello', (message) => {
      console.log(message)
    })
  }
}
