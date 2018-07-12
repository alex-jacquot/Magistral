import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../user';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User;
  userRef: AngularFireObject<any>;
  listeCoursPublies: Observable<any[]>;
  userId: string;
  modification: boolean;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public authService: AuthService) {
    this.modification = false;
    this.user = {
      identifiant: "",
      nom: "",
      prenom: "",
      pseudo: "",
      email: "",
      motDePasse: ""
    };
    this.afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.userId = auth.uid;
        this.getUtilisateur(this.userId);
      }
    });

  }

  ngOnInit() {
    this.listeCoursPublies = this.db.list('Cours', ref => ref.orderByChild('auteur').equalTo("TestTest")).snapshotChanges();
  }

  getUtilisateur(UserId: string): void {
    this.userRef = this.db.object('Users/' + this.userId + "/");
    this.userRef.snapshotChanges().subscribe(action => {
      this.user.identifiant = action.payload.val().identifiant;
      this.user.nom = action.payload.val().nom;
      this.user.prenom = action.payload.val().prenom;
      this.user.pseudo = action.payload.val().pseudo;
      this.user.email = action.payload.val().email;
      this.user.motDePasse = action.payload.val().motDePasse;
    });
  }


  modifTrue(): void {
    this.modification = true;
  }
  modifFalse(): void {
    this.modification = false;
  }

  updateUtilisateur(Utilisateur: User): void {
    this.db.object('/Users/' + this.userId).update(Utilisateur);
    this.modifFalse();
  }

  deleteCours(): void {
    this.db.object('/Users/' + this.userId).remove();
  }

  logout() {
    this.authService.signOut();
  }
}
