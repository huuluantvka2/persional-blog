import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItWebsiteService } from './desktop/services/it-website.service';
import { SocketClientService } from './socket-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'App chat';
  constructor(
    private socket: SocketClientService,
    private router: Router,
    private itWebService: ItWebsiteService
  ) {

  }
  ngOnInit(): void {
    //Check đăng nhập
    // this.itWebService.protectSignIn().then(res => {
    //   this.router.navigate(['/'])
    // })
    // this.router.navigate(['/admin/daskboard'])
  }
}
