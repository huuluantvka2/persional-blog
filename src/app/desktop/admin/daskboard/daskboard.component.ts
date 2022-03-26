import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daskboard',
  templateUrl: './daskboard.component.html',
  styleUrls: ['./daskboard.component.scss']
})
export class DaskboardComponent implements OnInit {
  expand: boolean = true
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  gotoPost() {
    this.router.navigate(['/admin/daskboard/posts'])
  }
}
