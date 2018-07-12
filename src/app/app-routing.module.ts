import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import { CoursListeComponent } from './cours-liste/cours-liste.component';
import { CoursCreerComponent } from './cours-creer/cours-creer.component';
import { RechercheComponent } from './recherche/recherche.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/presentation', pathMatch: 'full' },
  { path: 'presentation', component: PresentationComponent },
  { path: 'cours-liste', component: CoursListeComponent },
  { path: 'cours-creer', component: CoursCreerComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'user-info', component: UserInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
