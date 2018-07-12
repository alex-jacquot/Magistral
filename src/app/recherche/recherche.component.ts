import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireAction } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

 import { Cours } from '../cours';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})

export class RechercheComponent implements OnInit {


  lcours$: Observable<any[]>;
  rescours$: Observable<any[]>;
  private searchTerms = new Subject<string>();

    selectedCours: Cours;
    selectedKey: string;

  constructor(private db: AngularFireDatabase) {
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
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  searchCours(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    var query = this.db.list('Cours', ref => ref.orderByChild('titre').equalTo(term)).snapshotChanges();
    return query;
  }

  ngOnInit(): void{

    this.lcours$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchCours(term)),
    );
    }

}
