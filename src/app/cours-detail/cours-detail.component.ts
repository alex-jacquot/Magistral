import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Cours } from '../cours';
import { Commentaire } from '../commentaire/commentaire';

import { AuthService } from '../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cours-detail',
  templateUrl: './cours-detail.component.html',
  styleUrls: ['./cours-detail.component.css']
})
export class CoursDetailComponent implements OnInit {
  @Input() cours: Cours;
  @Input() key: string;
  userRef: AngularFireObject<any>;
  userId: string;
  modification: boolean;
  chaineMots: string;
  listeCommentaires: Observable<any[]>;
  commentaire: Commentaire;
  listeLignes: Array<string>;
  userPseudo: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public authService: AuthService) {
    this.modification = false;
    this.commentaire = {
      auteur: "",
      note: 0,
      texte: ""
    };

    this.afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.userId = auth.uid;
        this.userRef = this.db.object('Users/' + this.userId + "/");
        this.userRef.snapshotChanges().subscribe(action => {
          this.userPseudo = action.payload.val().pseudo;
        });
      }

    });
  }
  ngOnInit() {
    this.chaineMots = "";
  }

  ngOnChanges() {
    this.listeCommentaires = this.db.list('Commentaires/' + this.key + "/").snapshotChanges();
    if (this.cours) {
      this.listeLignes = this.cours.description.split('\n')
    };
  }

  modifTrue(): void {
    this.chaineMots = this.cours.motsCles.join(",");
    this.modification = true;
  }
  modifFalse(): void {
    this.modification = false;
  }

  deleteCours(): void {
    this.db.object('/Cours/' + this.key).remove();
  }

  updateCours(cours: Cours): void {
    cours.motsCles = this.chaineMots.split(",");
    this.db.object('/Cours/' + this.key)
      .update(cours);
    this.modifFalse();
  }

  addCommentaire(note: number, texte: string) {
    this.commentaire.auteur = this.userPseudo;
    this.commentaire.note = note;
    this.commentaire.texte = texte;
    this.db.list('/Commentaires/' + this.key + '/').push(this.commentaire);

  }

  deleteCommentaire(key: string): void {
    this.db.object('/Commentaires/' + this.key + "/" + key).remove();
  }
}
