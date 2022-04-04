import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItWebsiteService } from 'src/app/desktop/services/it-website.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  listPost: Array<any> = []
  paging: any = { current_page: 1 }
  listNavigation: Array<number> = []
  constructor(
    private webService: ItWebsiteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.route.snapshot.params.page) this.router.navigate(['/admin/daskboard/posts'], { queryParams: { page: 1 } })
    this.route.queryParams.pipe(filter(item => item.page)).subscribe(val => {
      this.paging.current_page = +val.page
      this.getData()
    })
  }
  getData() {
    this.webService.showLoading().then(() => {
      this.webService.getAllPosts({}, '-content', 10, this.paging.current_page).then((res: any) => {
        this.paging = res.paging
        this.listPost = res.data
        this.listNavigation = this.webService.renderNavigation(this.paging.current_page, this.paging.total, 10)
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  gotoAdd() {
    this.router.navigate(['/admin/daskboard/posts/add'])
  }
  trackByMyFunc(index, item) {
    return item.name;
  }
  gotoPage(page, event) {
    event.preventDefault()
    if (page)
      this.router.navigate(['/admin/daskboard/posts'], { queryParams: { page: page } })
  }
  gotoPrevOrNext(action: 'next' | 'prev') {
    if (action == 'next') this.router.navigate(['/admin/daskboard/posts'], { queryParams: { page: this.paging.current_page + 1 } })
    else this.router.navigate(['/admin/daskboard/posts'], { queryParams: { page: this.paging.current_page - 1 } })
  }
  gotoDetail(id) {
    this.router.navigate(['/admin/daskboard/posts', id], { state: { current_page: this.paging.current_page } })
  }
  updatePost(item) {
    this.webService.updatePostById(item._id, { active: !item.active }).then(res => item.active = !item.active).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') })
  }
}
