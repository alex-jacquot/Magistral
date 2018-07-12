import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    tests: Observable<any[]>;
    title = 'Magistral';
    log: boolean;

    constructor(db: AngularFireDatabase, public authService: AuthService, private router:Router) {
        this.tests = db.list('TEST').valueChanges();
    }

    login(){
        if (this.authService.authState != null){ return true};
    }

    logout(){
        this.authService.signOut();
    }
}
