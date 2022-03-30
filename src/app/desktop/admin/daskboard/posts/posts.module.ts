import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NewPostComponent } from './new-post/new-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: 'new-post',
        component: NewPostComponent
      },
      {
        path: 'detail-post',
        component: DetailPostComponent
      },
    ]
  }
]

@NgModule({
  declarations: [PostsComponent, NewPostComponent, DetailPostComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class PostsModule { }
