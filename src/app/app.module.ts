import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { CoursListeComponent } from './cours-liste/cours-liste.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { CoursDetailComponent } from './cours-detail/cours-detail.component';
import { PresentationComponent } from './presentation/presentation.component';
import { LoginPageComponent }  from './login-page/login-page.component';

import { AppRoutingModule } from './app-routing.module';
import { RechercheComponent } from './recherche/recherche.component';
import { AuthService } from './providers/auth.service';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserComponent } from './user/user.component';
import { UserService } from './providers/user.service';
import { CoursCreerComponent } from './cours-creer/cours-creer.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursListeComponent,
    CommentaireComponent,
    CoursDetailComponent,
    PresentationComponent,
    LoginPageComponent,
    UserInfoComponent,
    RechercheComponent,
    UserComponent,
    CoursCreerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
