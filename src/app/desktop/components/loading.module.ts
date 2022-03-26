import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOneComponent } from './loading/loading-one/loading-one.component';



@NgModule({
  declarations: [LoadingOneComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingOneComponent]
})
export class LoadingModule { }
