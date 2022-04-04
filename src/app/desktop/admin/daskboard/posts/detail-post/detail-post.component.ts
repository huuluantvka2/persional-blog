import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItWebsiteService } from 'src/app/desktop/services/it-website.service';
import MyUploadAdapter from '../MyUploadAdapter';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  constructor(
    private webService: ItWebsiteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  PostForm: FormGroup
  listCategory: Array<any> = []
  public config = {
    placeholder: 'Vui lòng nhập nội dung bài viết',
  }
  modalDeletePost: any
  current_page: string = this.router.getCurrentNavigation().extras.state.current_page
  public Editor = DecoupledEditor
  ngOnInit(): void {
    this.getData()
    this.initForm()
  }
  getData() {
    this.modalDeletePost = new Modal(document.getElementById('modalDeletePost'))
    this.webService.showLoading().then(() => {
      Promise.all([
        this.webService.getAllCategorys({}),
        this.webService.getDetailPostByID(this.route.snapshot.params._id)
      ]).then(([categorys, post]: any) => {
        this.listCategory = categorys.data
        this.asignData(post)
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  initForm() {
    this.PostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      thumbnail: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })
  }
  asignData(post) {
    this.PostForm.controls.title.setValue(post.title)
    this.PostForm.controls.thumbnail.setValue(post.thumbnail)
    this.PostForm.controls.description.setValue(post.description)
    this.PostForm.controls.content.setValue(post.content)
    this.PostForm.controls.category.setValue(post.category._id)
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
          this.savePost()
        }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
      })

      this.webService.uploadImage('thumbnail_post', reader.result, this.PostForm.value.thumbnail || null).then(res => {
        this.PostForm.controls.thumbnail.setValue(res)
      })
    }
  }
  deleteCategory() {
    this.webService.showLoading().then(() => {
      this.webService.deletePostById(this.route.snapshot.params._id).then(res => {
        this.webService.alertMessage("Xóa bài viết thành công", 'success')
        this.router.navigate(['/admin/daskboard/posts'], { queryParams: { page: this.current_page } })
        this.closeModalDelete()
      }).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') }).finally(() => this.webService.hideLoading())
    })
  }
  savePost() {
    if (this.PostForm.valid)
      this.webService.updatePostById(this.route.snapshot.params._id, this.PostForm.value).then(res => console.log('Cập nhật thành công')).catch(err => { if (err.status == 401) this.router.navigate(['/admin']); this.webService.alertMessage(err.error?.message, 'error') })
  }
  deletePostModal() {
    this.modalDeletePost.show()
  }
  closeModalDelete() {
    this.modalDeletePost.hide()
  }
  hangeLoadError(event) {
    console.log(event)
  }
}
