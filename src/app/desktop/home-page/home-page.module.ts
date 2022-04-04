import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'daskboard',
        loadChildren: () => import('./daskboard/daskboard.module').then(m => m.DaskboardModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
      }
    ]
  }
]

@NgModule({
  declarations: [HomePageComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class HomePageModule { }
