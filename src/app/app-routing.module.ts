import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'authen',
    loadChildren: () => import('./desktop/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./desktop/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./desktop/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./desktop/home-page/home-page.module').then(m => m.HomePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
