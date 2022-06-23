import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AouthGuard } from './aouth/aouth.guard';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ViewAndEditProfileComponent } from './view-and-edit-profile/view-and-edit-profile.component';
const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'bookmark',
    component: BookmarksComponent,
    canActivate: [AouthGuard],
  },
  {
    path: 'create',
    component: CreateArticleComponent,
    canActivate: [AouthGuard],
  },
  {
    path: 'profile',
    component: ViewAndEditProfileComponent,
    canActivate: [AouthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AouthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
