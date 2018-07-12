import { Component, OnInit, Input, Injectable } from '@angular/core';
import { User } from '../user';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';

@Injectable()
export class UserService {

    @Input() utilisateur : User;
    userId: string;
    UsersObject: AngularFireObject<User>;
    UsersList: AngularFireList<User>;

    constructor( private db: AngularFireDatabase, public authService: AuthService, public afAuth: AngularFireAuth) {
        this.utilisateur = {
          identifiant: "",
          nom: "",
          prenom: "",
          pseudo: "",
          email:"",
          motDePasse: ""
        }
    }

/*    ngOnInit() {
      this.UsersList = this.db.list('/Users');
  }*/

    getUsersList(): AngularFireList<User> {
        if (!this.userId) return;
        this.UsersList = this.db.list('/Users');
        return this.UsersList;
    }

    /**Ajout d'un nouvel user a la bd*/
    creerUser(Id:string, Nom:string, Prenom:string, Pseudo:string, Email: string, MotDePasse:string): void{

        this.userId = Id;
        console.log(this.userId);
        this.UsersObject = this.db.object('/Users/'+this.userId);

        this.utilisateur.identifiant = Id;
        this.utilisateur.nom = Nom;
        this.utilisateur.prenom = Prenom;
        this.utilisateur.pseudo = Pseudo;
        this.utilisateur.email = Email;
        this.utilisateur.motDePasse = MotDePasse;

        this.UsersObject.update(this.utilisateur);
    }
}
