import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItWebsiteService } from '../services/it-website.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private webService: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url == '/') this.router.navigate(['/daskboard'])
  }
}
