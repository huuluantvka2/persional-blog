import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketClientService } from './socket-client.service';
import { CommonModule } from '@angular/common';
import { ItWebsiteService } from './desktop/services/it-website.service';
import { LoadingModule } from './desktop/components/loading.module';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    LoadingModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [SocketClientService, ItWebsiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
