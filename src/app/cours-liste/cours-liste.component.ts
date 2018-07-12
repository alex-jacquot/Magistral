import { Component, OnInit, Input} from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LCOURS } from '../mock-cours';
import { Cours } from '../cours';
@Component({
  selector: 'app-cours-liste',
  templateUrl: './cours-liste.component.html',
  styleUrls: ['./cours-liste.component.css']
})
export class CoursListeComponent implements OnInit {
  @Input() listeCours: Observable<any[]>;
  lCours = LCOURS;
  selectedCours: Cours;
  selectedKey: string;
  constructor(private db: AngularFireDatabase) {
    this.listeCours = this.db.list('Cours').snapshotChanges();
  }

  ngOnInit() {
  }

  onSelect(cours: any): void {
    var coursSelect = cours.payload.val();
    this.selectedCours = {
      auteur: coursSelect.auteur,
      titre: coursSelect.titre,
      description: coursSelect.description,
      noteMoyenne: coursSelect.noteMoyenne,
      dateCreation: coursSelect.dateCreation,
      motsCles: coursSelect.motsCles,
      fichier: coursSelect.fichier
    };
    this.selectedKey = cours.key;
    console.log("onSelect: " + cours.key);
    console.log("onSelect: " + this.selectedCours.auteur);
  }
}
