import { Component, OnInit } from '@angular/core';
import { SocketClientService } from 'src/app/socket-client.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private socket: SocketClientService
  ) { }

  ngOnInit(): void {
    this.socket.setupSocketConnection()
  }

}
