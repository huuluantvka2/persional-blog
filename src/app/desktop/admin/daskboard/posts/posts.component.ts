import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public Editor = ClassicEditor;
  @ViewChild("myEditor", { static: false }) myEditor: any;
  dataCdk: string = ''
  public config = {
    placeholder: 'Type the content here!'
  }
  constructor() { }

  ngOnInit(): void {
  }
  public onReady(editor) {
    console.log(editor)
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  getData() {
    console.log(this.dataCdk)
  }
}
