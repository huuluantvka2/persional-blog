import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItWebsiteService } from '../../services/it-website.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  listPost: Array<any> = []
  post: any = {}
  constructor(
    private route: ActivatedRoute,
    private webService: ItWebsiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    document.getElementById('content-post').innerHTML = ''
    this.webService.showLoading().then(() => {
      const id_post = this.route.snapshot.params._id
      Promise.all([
        this.webService.getDetailPostByID(id_post),
        this.webService.getAllPosts({ active: { $eq: true } }, 'title', 10, 1)
      ]).then(([post, listPost]: any) => {
        this.post = post
        this.post.spl
        document.getElementById('content-post').insertAdjacentHTML('afterbegin', this.post.content)
        this.listPost = listPost.data.filter(item => item._id != id_post)
      }).catch(err => this.webService.alertMessage(err.message, 'error')).finally(() => this.webService.hideLoading())
    })

  }
  gotoPost(id) {
    this.router.navigate(['/post', id])
    this.getData()
  }
}
