import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  }
]

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class PostsModule { }
