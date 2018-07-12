import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Cours } from '../cours';
import { Commentaire } from '../commentaire/commentaire';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cours-creer',
  templateUrl: './cours-creer.component.html',
  styleUrls: ['./cours-creer.component.css']
})
export class CoursCreerComponent implements OnInit {
  userRef: AngularFireObject<any>;
  @Input() cours: Cours;
  userId: string;
  listeCours: AngularFireList<any>;
  chaineMots: String;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, public authService: AuthService) {
    this.cours = {
      auteur: "",
      titre: "",
      description: "",
      noteMoyenne: 5,
      dateCreation: this.dateDuJour(),
      motsCles: [""],
      fichier: ""
    }

    this.afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.userId = auth.uid;
        this.userRef = this.db.object('Users/' + this.userId + "/");
        this.userRef.snapshotChanges().subscribe(action => {
          this.cours.auteur = action.payload.val().pseudo;
        });
      }

    });

  }

  ngOnInit() {
    this.chaineMots = ""
    this.listeCours = this.db.list('/Cours');
  }

  addCours(): void {
    this.cours.motsCles = this.chaineMots.split(",");
    this.listeCours.push(this.cours);
    this.router.navigate(['/']);
  }
  annuler(): void {
    this.router.navigate(['/']);
  }
  dateDuJour(): string {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var jour, mois;
    if (dd < 10) { jour = '0' + dd; } else { jour = "" + dd; }
    if (mm < 10) { mois = '0' + mm; } else { mois = "" + mm; }
    var res = jour + '/' + mois + '/' + yyyy;
    return res;
  }
}
