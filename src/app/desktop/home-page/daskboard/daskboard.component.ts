import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItWebsiteService } from '../../services/it-website.service';

@Component({
  selector: 'app-daskboard',
  templateUrl: './daskboard.component.html',
  styleUrls: ['./daskboard.component.scss']
})
export class DaskboardComponent implements OnInit {

  listPost: Array<any> = []
  paging: any = { current_page: 1 }
  constructor(
    private webService: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.webService.showLoading().then(() => {
      this.webService.getAllPosts({ active: { $eq: true } }, '-content', 10, this.paging.current_page).then((res: any) => {
        this.paging = res.paging
        this.listPost = res.data
        console.log(this.listPost)
      }).catch(err => { this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  gotoPostDetail(_id) {
    this.router.navigate(['/post', _id])
  }

}
