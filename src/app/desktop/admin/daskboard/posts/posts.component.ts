import { Component, OnInit, ViewChild } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ItWebsiteService } from 'src/app/desktop/services/it-website.service';
import MyUploadAdapter from './MyUploadAdapter'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  dataCdk: string = ''
  public Editor = DecoupledEditor
  public config = {
    placeholder: 'Type the content here!',
  }
  listPost: Array<any> = []
  constructor(
    private webService: ItWebsiteService
  ) { }

  ngOnInit(): void {
  }
  getData() {

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
  deleteImage() {
    this.webService.deleteIamge('https://firebasestorage.googleapis.com/v0/b/persional-website.appspot.com/o/post%2F1648476653268?alt=media&token=1d0e0796-fc8b-466e-ba65-bdfefaac8bee').then(res => console.log(res))
  }
}
