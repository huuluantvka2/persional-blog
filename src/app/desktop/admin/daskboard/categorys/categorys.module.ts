import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorysComponent } from './categorys.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CategorysComponent,
  }
]

@NgModule({
  declarations: [CategorysComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class CategorysModule { }
