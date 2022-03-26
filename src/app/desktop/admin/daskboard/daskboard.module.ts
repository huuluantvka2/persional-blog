import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaskboardComponent } from './daskboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DaskboardComponent,
    children: [
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      }
    ]
  }
]

@NgModule({
  declarations: [DaskboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DaskboardModule { }
