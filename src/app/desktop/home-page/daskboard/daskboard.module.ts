import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaskboardComponent } from './daskboard.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: DaskboardComponent,
  }
]

@NgModule({
  declarations: [DaskboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class DaskboardModule { }
