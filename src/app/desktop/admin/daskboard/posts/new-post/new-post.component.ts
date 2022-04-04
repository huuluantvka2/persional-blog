import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItWebsiteService } from 'src/app/desktop/services/it-website.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import MyUploadAdapter from '../MyUploadAdapter';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(
    private webService: ItWebsiteService,
    private router: Router
  ) { }
  PostForm: FormGroup
  listCategory: Array<any> = []
  public config = {
    placeholder: 'Vui lòng nhập nội dung bài viết',
  }
  public Editor = DecoupledEditor
  ngOnInit(): void {
    this.getData()
    this.initForm()
  }
  getData() {
    this.webService.showLoading().then(() => {
      this.webService.getAllCategorys({}).then((res: any) => {
        this.listCategory = res.data
        this.PostForm.controls.category.setValue(this.listCategory[0]._id)
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  initForm() {
    this.PostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      thumbnail: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })
  }
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, 'post', this.webService);
    };
  }
  uploadThumbnail() {
    document.getElementById('input-image-post').click()
  }
  updateImage(event) {
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.webService.showLoading().then(() => {
        this.webService.uploadImage('thumbnail_post', reader.result, this.PostForm.value.thumbnail || null).then(res => {
          this.PostForm.controls.thumbnail.setValue(res)
        }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
      })

      this.webService.uploadImage('thumbnail_post', reader.result, this.PostForm.value.thumbnail || null).then(res => {
        this.PostForm.controls.thumbnail.setValue(res)
      })
    }
  }
  addPost() {
    this.webService.showLoading().then(() => {
      this.webService.addPosts(this.PostForm.value).then(res => {
        this.webService.alertMessage("Tạo bài viết thành công", 'success')
        this.router.navigate(['/admin/daskboard/posts'])
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
}
