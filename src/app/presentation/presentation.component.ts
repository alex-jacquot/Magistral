import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  listeCours: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
   }

  ngOnInit() {
    this.listeCours = this.db.list('Cours').snapshotChanges();
  }

}
